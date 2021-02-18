import { useContext } from 'react';
import styled from 'styled-components';
import ShowEmojis from './ShowEmojis';
import { Context } from '../store/Store';

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
margin: 1rem 0;
`
const Content = styled.div`
  padding-bottom: 1rem;
  line-height: 1.5;
`
const Image = styled.img`
width: 100%;
margin-bottom: 1rem;
`
const CtaWrapper = styled.div`
  position:relative;
  display:flex;
`
const Comment = styled.div`
  margin-top: 1rem;
  padding: 1rem 0;
  border-top: 1px solid ${props => props.theme.primaryBorder};
`

const Posts = () => {
  const [state] = useContext(Context);
  const posts = state.posts;
  return (
    <PostsWrapper>
      {
        posts.map(post => {
          return (
            <Post key={post.id}>
              <Heading>{post.title}</Heading>
              <Content>{post.content}</Content>
              <Image src={post.img} alt={post.title} />
              <CtaWrapper>
                <Reactions postId={post.id} />
                <ShowEmojis postId={post.id} />
              </CtaWrapper>
              {
                post.comments && post.comments.map(comment => {
                  console.log(comment);
                  return (
                    <>
                      <Comment>
                        {comment.comment}

                      </Comment>
                      <CtaWrapper>
                        <Reactions postId={comment.id} />
                        <ShowEmojis postId={comment.id} />
                      </CtaWrapper>
                    </>
                  )
                })
              }
            </Post>
          )
        })
      }
    </PostsWrapper>
  )
}
export default Posts;