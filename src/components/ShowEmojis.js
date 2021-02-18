import { useContext } from 'react';
import styled from 'styled-components';
import IcomoonReact from "icomoon-react";
import iconSet from "../assets/icons/selection.json";
import Emojis from './Emojis';
import { Context } from '../store/Store';
const Wrapper = styled.div`
  position:relative;
`
const ShowReactions = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.secondaryBorder};
  text-align:center;
  padding:0;
  background-color: ${props => props.theme.primaryBg};
`

const ShowEmojis = ({ postId }) => {
  const [state, dispatch] = useContext(Context);
  const handleClick = (event) => {
    dispatch({ type: 'TOGGLE_EMOJIS', payload: { id: event.currentTarget.dataset.postid, show: !state.showEmoji.show } });
  };
  return (
    <Wrapper>
      {state.showEmoji.show && state.showEmoji.id == postId ? <Emojis postId={postId} /> : ''}
      <ShowReactions onClick={handleClick} onKeyPress={handleClick} data-postid={postId}>
        <IcomoonReact iconSet={iconSet} color="#000" size={20} icon="insert_emoticon" />
      </ShowReactions>
    </Wrapper>
  )
}
export default ShowEmojis;