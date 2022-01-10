import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const PostActions = (props) => {
  const { handleEditPost, handleDeletePost } = props;

  return (
    <>
      <Button variant='dark' onClick={handleEditPost}>
        <FontAwesomeIcon icon={faPen} />
      </Button>
      <Button variant='dark' onClick={handleDeletePost}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  );
};

PostActions.propTypes = {
  handleEditPost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostActions;
