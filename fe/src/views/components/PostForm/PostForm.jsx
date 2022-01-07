import './PostForm.css';
import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../components/Ckeditor/Ckeditor';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";

const PostForm = props => {
  const {
    post,
    tags,
    bodyContent,
    handleSubmit,
    handleCancel,
    handlePreview,
    handleFileInput,
    handleInputChange,
    handleContentChange,
    handleTagSelectChange,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={10} md={8} className="postform">
          {/* input title */}
          <Form.Group className="mb-4">
            <Form.Label>
              <b>Title</b>
            </Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder='Title here'
              value={post.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              {/* input tag */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <b>Tag</b>
                </Form.Label>
                <Form.Select
                  value={post.tags[0]?.name}
                  onChange={handleTagSelectChange}
                >
                  {post.tags.length
                    ? [...tags].map(tag => (
                      <option key={tag._id}>
                        {tag.name}
                      </option>
                    ))
                    : [<option key="0">Select Tag</option>].concat(
                      ...[...tags].map(tag => (
                        <option key={tag._id}>
                          {tag.name}
                        </option>
                      ))
                    )
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* input thumbnail */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <b>Thumbnail</b>
                </Form.Label>
                <Form.Control type="file" size='sm' onChange={handleFileInput} />
              </Form.Group>
            </Col>
          </Row>

          {/* input content */}
          <Form.Group className="mb-5">
            <Form.Label>
              <b>Content</b>
            </Form.Label>
            <Editor
              handleChange={data => handleContentChange(data)}
              data={bodyContent}
            />
          </Form.Group>
        </Col>
        <Col xs={2} md={4} className="postform_actions">
          <Button variant='dark' type='submit' title='Save'>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button variant='dark' title='Cancel' onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Button variant='dark' title='Preview' onClick={handlePreview}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

PostForm.propTypes = {
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
  tags: PropTypes.array.isRequired,
  bodyContent: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleFileInput: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handleTagSelectChange: PropTypes.func.isRequired,
};

export default PostForm;
