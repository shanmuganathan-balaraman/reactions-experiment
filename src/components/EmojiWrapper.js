import { useState, useEffect, useContext } from 'react';
import Emoji from './Emoji';
import styled from 'styled-components';
import { Context } from './Store';
const EmojisWrapper = styled.ul`
  list-style-type: none;
  height: 2rem;
  border-radius: 1.5rem;
  display:inline-flex;
  border: 1px solid #e0e0e0;
  text-align:center;
  padding:0 0.75rem;
  background-color: #fff;
  box-sizing:border-box;
  position:absolute;
  top:-40px;
`
const EmojiWrapper = ({ postId }) => {
  const [state, dispatch] = useContext(Context);
  return (
    <EmojisWrapper>
      {state.emojis.map(emoji => (
        <Emoji key={emoji.id} label={emoji.name} emoji={emoji.emoji} emojiId={emoji.id} postId={postId} />
      ))}
    </EmojisWrapper>
  )
}
export default EmojiWrapper;