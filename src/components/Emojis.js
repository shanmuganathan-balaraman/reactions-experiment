import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../store/Store';
const EmojisWrapper = styled.ul`
  list-style-type: none;
  height: 2rem;
  border-radius: 1.5rem;
  display:flex;
  align-items: center;
  text-align:center;
  padding:0 0.75rem;
  background-color: ${props => props.theme.primaryBg};
  box-sizing:border-box;
  position:absolute;
  top:-2.5rem;
  box-shadow: 2px 2px 5px ${props => props.theme.boxShadow};
`
const EmojiItem = styled.li`
  padding:0 0.5rem;
  background-color:  ${props => props.theme.primaryBg};
  width:1rem;
  text-align:center;
  position:relative;
  
  span {
    font-size: 1rem;
    display: inline-block;
    line-height:2; 
    :hover {
      transform: scale(2);
      transform-origin: bottom;
      transition: transform .2s ease;
       + label {
        display: inline-block;
       }
    }
  }
  label{
    display: none;
    padding: 0.75rem 1rem;
    position: absolute;
    left: 50%;
    border-radius: 2px;
    color: ${props => props.theme.secondaryFg};
    background-color: ${props => props.theme.secondaryBg};
    font-size:0.875rem;
    transform: translate(-50%,-65px);
    ::after {
      width: 0; 
      height: 0; 
      border-left: 0.25rem solid transparent;
      border-right: 0.25rem solid transparent;
      border-top: 0.25rem solid ${props => props.theme.secondaryBg};
      position: absolute;
      bottom: -0.25rem;
      content: '';
      left: calc(50% - 0.25rem);
    }
  }
`
const Emojis = ({ postId }) => {
  const [state, dispatch] = useContext(Context);
  const handleReaction = (e) => {
    const targetElDataset = e.target.dataset;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'reaction_id': targetElDataset.id,
        'user_id': state.currentUser,
        'content_id': targetElDataset.post
      })
    };
    fetch('https://artful-iudex.herokuapp.com/user_content_reactions', options)
      .then(result => result.json())
      .then(result => {
        dispatch({ type: 'ADD_REACTION', payload: result });
        dispatch({ type: 'TOGGLE_EMOJIS', payload: !state.showEmoji.show });
      });
  }
  return (
    <EmojisWrapper>
      {state.emojis.map(emoji => (
        <EmojiItem key={emoji.id}>
          <span onClick={handleReaction} data-id={emoji.id} data-post={postId}>{emoji.emoji}</span>
          <label>{emoji.name}</label>
        </EmojiItem>
      ))}
    </EmojisWrapper>
  )
}
export default Emojis;