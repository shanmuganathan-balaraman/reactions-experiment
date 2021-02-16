import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Summary from './Summary';
import { groupBy } from '../Utils';
import { Context } from './Store';

const Wrapper = styled.ul`
  list-style-type:none;
  display: inline-flex;
  margin: 0;
  padding:0;
  height: 2rem;
`
const Reaction = styled.li`
  border-radius: 1.5rem;
  width: auto;
  border: 1px solid #e0e0e0;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  background-color: #fff;
  &.current-user {
    border: 1px solid #0f62fe;
    background-color: #edf5ff;
  }
`
const Emoji = styled.span`
  line-height: 30px;
`
const Count = styled.span`
  margin-left: 0.5rem;
`

const Reactions = ({ postId }) => {
  const [state, dispatch] = useContext(Context);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [currentlyHovering, setCurrentlyHovering] = useState(0);
  const [activeTab, setActiveTab] = useState('1');
  const toggleSummary = (visibility, e) => {
    const targetEl = e.currentTarget;
    setActiveTab(targetEl.dataset.emoji);
    setShowSummary(visibility);
    setCurrentlyHovering(targetEl.dataset.emoji);

  };
  const clickHandler = (e) => {
    const reactoinId = e.currentTarget.dataset.reaction;
    if (!!reactoinId) {
      fetch('https://artful-iudex.herokuapp.com/user_content_reactions/' + reactoinId, {
        method: 'DELETE',
      })
        .then(result => result.json())
        .then(result => {
          dispatch({ type: 'REMOVE_REACTION', payload: reactoinId });
        })
    }

  }
  useEffect(() => {
    if (state.reactions.length <= 0) {
      fetch('https://artful-iudex.herokuapp.com/user_content_reactions')
        .then(result => result.json())
        .then(
          (result) => {
            dispatch({ type: 'SET_REACTIONS', payload: result });
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [])
  if (error) {
    return (
      <Wrapper>
        <Reaction>Error: {error.message}</Reaction>
      </Wrapper>
    );
  } else if (!isLoaded) {
    return (
      <Wrapper>
        <Reaction>Loading...</Reaction>
      </Wrapper>
    );
  } else {
    const filtered = state.reactions.filter(reaction => reaction.content_id == postId);
    const groupedReactions = groupBy(filtered, 'reaction_id');
    // console.log(state.currentUser);
    return (
      <>
        <Wrapper>
          {Object.keys(groupedReactions).map(key => {
            let getEmoji = state.emojis.find(o => o.id == key);
            const currentUserReactedList = groupedReactions[key].filter(o => o.user_id == state.currentUser);
            const currentUserReacted = currentUserReactedList.length > 0;
            return (
              <Reaction key={key} data-emoji={key} data-reaction={currentUserReacted ? currentUserReactedList[0].id : ''} onMouseEnter={(e) => toggleSummary(true, e)} onMouseLeave={(e) => toggleSummary(false, e)} onClick={clickHandler} className={currentUserReacted ? 'current-user' : ''} >
                <Emoji>{getEmoji.emoji}</Emoji>
                <Count>{groupedReactions[key].length}</Count>
                {showSummary && (currentlyHovering === key) ? <Summary activeEl={activeTab} postId={postId} reactionsData={filtered} reactionsDataGrouped={groupedReactions} /> : ''}
              </Reaction>
            )
          })}
        </Wrapper>
      </>
    )
  }
}

export default Reactions;