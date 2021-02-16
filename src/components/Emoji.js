import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Store';
const EmojiItem = styled.li`
  padding:0 0.5rem;
  background-color: #fff;
  width:1rem;
  text-align:center;
  
  span {
    font-size: 1rem;
    display: inline-block;
    line-height:30px; 
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
    position: relative;
    top: -90px;
    left: -20px;
    border-radius: 2px;
    font-size: 11px;
    color: #fff;
    background-color: #161616;
    font-size:12px;
    ::after {
      width: 0; 
      height: 0; 
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #161616;
      position: absolute;
      bottom: -4px;
      content: '';
      left: calc(50% - 4px);
    }
  }
`
const Emoji = ({ emoji, label, emojiId, postId }) => {
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
        dispatch({ type: 'TOGGLE_EMOJIS', payload: !state.showEmojis });
      });
  }
  return (
    <EmojiItem>
      <span onClick={handleReaction} data-id={emojiId} data-post={postId}>{emoji}</span>
      <label>{label}</label>
    </EmojiItem>
  )
}
export default Emoji;