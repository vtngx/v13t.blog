import Post from '../Post';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import React, { useState, useEffect, memo } from 'react';
import { listPosts } from '../../../../../services/posts.api';

const PostList = (props) => {
  const { tag } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    listPosts(tag).then(data => setPosts(data));
  }, [tag]);

  return (
    <>
      {
        posts.length
        ? posts
          .map((post, i) => {
            return i % 2 === 0
              ? (posts[i + 1]
                ? (<Row key={`row_${i}`}>
                    <Post post={post} index={i} />
                    <Post post={posts[i + 1]} index={i + 1} />
                  </Row>)
                : (<Row key={`row_${i}`}>
                    <Post post={post} index={i} />
                  </Row>))
              : null;
          })
          .filter(item => item)
        : null
      }
    </>
  );
};

PostList.propTypes = {
  tag: PropTypes.string || null,
}

export default memo(PostList);
