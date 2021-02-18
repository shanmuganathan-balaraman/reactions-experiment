import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { findItemByVal } from '../Utils';
import { Context } from '../store/Store';
import UserShimmer from './shimmers/UserShimmer';

const User = styled.li`
  width: auto;
  padding: 0;
  margin: 0 0.5rem 1rem 0;
  display:flex;
  align-items:center;
`
const Emoji = styled.span`
  line-height:.9;
  margin-right: 0.5rem; 
`
const Avatar = styled.img`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: #e0e0e0;
  margin-right: 0.5rem;
`
const UserName = styled.span`
  
`

const Detail = ({ userId, emojiId }) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    fetch("https://artful-iudex.herokuapp.com/users?id=" + userId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUser(result[0]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);
  if (error) {
    return (<User>Error: {error.message}</User>);
  } else if (!isLoaded) {
    return (
      <UserShimmer />
    );
  } else {
    let getEmoji = findItemByVal(state.emojis, 'id', emojiId);
    return (
      <User key={userId}>
        <Avatar src={user.avatar}></Avatar>
        <Emoji>{getEmoji.emoji}</Emoji>
        <UserName>{user.first_name + " " + user.last_name}</UserName>
      </User>
    )
  }

}

export default Detail;