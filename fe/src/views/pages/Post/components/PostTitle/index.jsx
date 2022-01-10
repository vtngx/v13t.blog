import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostTitle = (props) => {
  const { post } = props;
  return (
    <>
      <h1>
        {post.title}
      </h1>
      <div className='postPage_headerTitle_info'>
        <p>
          <b>{post.author.name}</b> | {post.createdAt}
        </p>
        <p>
          <FontAwesomeIcon icon={faTag} />
          <b><Link to='/'><i>{post.tags[0]?.name}</i></Link></b>
        </p>
      </div>
    </>
  );
};

PostTitle.propTyles = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }),
    tags: PropTypes.array
  }).isRequired,
};

export default PostTitle;
