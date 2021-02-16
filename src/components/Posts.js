import { useContext } from 'react';
import styled from 'styled-components';
import ShowEmojis from './ShowEmojis';
import { Context } from './Store';

import Reactions from './Reactions';
const PostsWrapper = styled.ul`
  list-style-type: none;
  margin:2rem auto;
  padding:0;
  width: 500px;
`
const Post = styled.li`

  padding: 0.5rem 1rem;
  border:1px solid #efefef;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`
const Heading = styled.h2`
`
const Content = styled.div`
  padding-bottom: 1rem;
`
const CtaWrapper = styled.div`
  position:relative;
  display:flex;
`

const Posts = () => {
  const [state, dispatch] = useContext(Context);
  const posts = state.posts;
  return (
    <PostsWrapper>
      {
        posts.map(post => {
          return (
            <Post key={post.id}>
              <Heading>{post.title}</Heading>
              <Content>{post.content}</Content>
              <CtaWrapper>
                <Reactions postId={post.id} />
                <ShowEmojis postId={post.id} />
              </CtaWrapper>
            </Post>
          )
        })
      }
    </PostsWrapper>
  )
}
export default Posts;