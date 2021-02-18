import styled from 'styled-components';

const Wrapper = styled.li`
  margin: 0 0.5rem 1rem 0;
  display: flex;
  align-items:center;
`
const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 0.5rem;
`
const Emoji = styled.span`
  width: 1rem;
  height: 1rem;
  background-color: #e0e0e0;
  margin-right: 0.5rem;
  border-radius: 50%;
`
const Username = styled.span`
  width: 10rem;
  height: 1rem;
  background-color: #e0e0e0;
`

const UserShimmer = () => {
  return (
    <Wrapper>
      <Avatar className='animate' />
      <Emoji className='animate' />
      <Username className='animate' />
    </Wrapper>
  )

}

export default UserShimmer;