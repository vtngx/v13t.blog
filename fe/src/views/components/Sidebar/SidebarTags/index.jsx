import { Link } from 'react-router-dom';
import { Nav, Button } from "react-bootstrap";
import React, { useContext, useState } from 'react';
import { deleteTag } from '../../../../services/tags.api';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TagsContext } from '../../../../providers/TagsProvider';

const SidebarTags = (props) => {
  const { tags, handleTagsChange } = useContext(TagsContext);
  const [hiddenTag, setHiddenTag] = useState('');

  const handleHoverButton = (tagId) => () => setHiddenTag(tagId);

  const handleDeleteTag = (tagId) => () => deleteTag(tagId).then(res => handleTagsChange());

  return (
    <>
      {tags.map(tag => (
        <Nav.Item
          key={tag._id}
          onMouseEnter={handleHoverButton(tag._id)}
          onMouseLeave={handleHoverButton('')}
        >
          <Button
            id={tag._id}
            variant='dark'
            className={tag._id === hiddenTag ? '' : 'hide-btn'}
            onClick={handleDeleteTag(tag._id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Link to={`/?t=${tag?._id}`}>
            {tag?.name?.toLowerCase()}
          </Link>
        </Nav.Item>
      ))}
    </>
  );
};

export default SidebarTags;
