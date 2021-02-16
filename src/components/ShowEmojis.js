import { useContext } from 'react';
import styled from 'styled-components';
import IcomoonReact from "icomoon-react";
import iconSet from "../assets/icons/selection.json";
import EmojiWrapper from './EmojiWrapper';
import { Context } from './Store';
const ShowReactions = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  text-align:center;
  padding:0;
  background-color: #fff;
  :focus {
    outline: none;
  }
`

const ShowEmojis = ({ postId }) => {
  const [state, dispatch] = useContext(Context);

  const handleClick = (event) => {
    console.log(!state.showEmojis);
    dispatch({ type: 'TOGGLE_EMOJIS', payload: !state.showEmojis });
  };
  return (
    <>
      {state.showEmojis ? <EmojiWrapper postId={postId} /> : ''}
      <ShowReactions onClick={handleClick} onKeyPress={handleClick}>
        <IcomoonReact iconSet={iconSet} color="#000" size={20} icon="insert_emoticon" />
      </ShowReactions>
    </>
  )
}
export default ShowEmojis;