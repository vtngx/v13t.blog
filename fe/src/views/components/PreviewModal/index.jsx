import './index.css';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from "react-router-dom";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Container, Modal, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PreviewModal = (props) => {
  const {
    post,
    showPreview,
    handleClosePreview,
  } = props;

  return (
    <Modal
      show={showPreview}
      onHide={handleClosePreview}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={true}        
    >
      <Container>
        <Col md={{ span: 8, offset: 2 }}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Preview Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='preview_header'>
              <h1>
                {post.title}
              </h1>
              <div className='preview_headerTitle_info'>
                <p>
                  {post.tags.length
                    ? <>
                      <FontAwesomeIcon icon={faTag} />
                      <b><Link to='/'><i>{post.tags[0]?.name}</i></Link></b>
                    </>
                    : null
                  }
                </p>
              </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: post.body}} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={handleClosePreview}>Close</Button>
          </Modal.Footer>
        </Col>
      </Container>
    </Modal>
  );
};

PreviewModal.propTypes = {
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
  showPreview: PropTypes.bool.isRequired,
  handleClosePreview: PropTypes.func.isRequired,
};

export default memo(PreviewModal);
