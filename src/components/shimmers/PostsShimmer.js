import styled from 'styled-components';

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
  width: 100%;
  margin: 0;
  height: 1rem;
  background-color: #e0e0e0;
  margin-bottom: 1rem;

`
const Content = styled.div`
  width: 100%;
  margin: 0;
  height: 3rem;
  background-color: #e0e0e0;
  margin-bottom: 1rem;

`
const CtaWrapper = styled.div`
   width: 100%;
  margin: 0;
  height: 1.5rem;
  background-color: #e0e0e0;
`

const PostsShimmer = () => {
  return (
    <PostsWrapper>
      {
        [1, 2, 3].map(post => {
          return (
            <Post key={post.id}>
              <Heading className="animate" />
              <Content className="animate" />
              <CtaWrapper className="animate" />
            </Post>
          )
        })
      }
    </PostsWrapper>
  )
}
export default PostsShimmer;