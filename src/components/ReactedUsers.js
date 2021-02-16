import styled from 'styled-components';
import User from './User';

const UserWrapper = styled.ul`
  display: block;
  list-style-type:none;
  margin: 0;
  padding:0;
  height: 2rem;
`

const ReactedUsers = ({ reactionsData }) => {
  return (
    <UserWrapper>
      {reactionsData.map(reaction => <User userId={reaction.user_id} emojiId={reaction.reaction_id} />)}
    </UserWrapper>
  )
}

export default ReactedUsers;