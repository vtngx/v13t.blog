import './index.css';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { createTag } from '../../../services/tags.api';
import { TagsContext } from '../../../providers/TagsProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Col, Button, Row, Container } from 'react-bootstrap';
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const NewTag = (props) => {
  const { handleTagsChange } = useContext(TagsContext);

  const navigate = useNavigate();

  const [tag, setTag] = useState({
    _id: '',
    name: '',
  });

  const handleInputChange = e => setTag({
    ...tag,
    name: e.target.value
  });

  // handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    if(tag.name.trim())
      createTag(tag).then(res => {
        handleTagsChange();
        navigate(-1);
      });
  };

  // handle cancel
  const handleCancel = () => navigate(-1);

  return (
    <Container fluid className="newTag">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10} md={8} className="newTagForm">
            <Form.Group className="mb-4">
              <Form.Label>
                <b>Name</b>
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder='Tag name here'
                value={tag.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={2} md={4} className="newTagForm_actions">
            <Button variant='dark' type='submit' title='Save'>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button variant='dark' title='Cancel' onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NewTag;
