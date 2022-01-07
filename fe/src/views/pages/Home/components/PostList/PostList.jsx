import React from 'react';
import Post from '../Post/Post';
import { Row } from 'react-bootstrap';

const PostList = (props) => {
  const { posts } = props;

  return (
    <>
      {
        posts.length
        ? posts
          .map((post, i) => {
            if (i % 2 === 0)
              if (posts[i + 1])
                return <Row key={`row_${i}`}>
                  <Post post={post} index={i} />
                  <Post post={posts[i + 1]} index={i + 1} />
                </Row>;
              else
                return <Row key={`row_${i}`}>
                  <Post post={post} index={i} />
                </Row>;
            else return null;
          })
          .filter(item => item)
        : null
      }
    </>
  );
};

export default PostList;
