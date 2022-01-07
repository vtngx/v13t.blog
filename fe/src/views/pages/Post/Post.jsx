import './Post.css';
import { useEffect, useState } from "react";
import formatDate from "../../../utils/formatDate";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPost, deletePost } from "../../../services/posts.api";
import { faPen, faTrash, faTag } from "@fortawesome/free-solid-svg-icons";

const Post = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    _id: '',
    title: '',
    body: '',
    createdAt: '',
    author: {
      _id: '',
      name:''
    },
    tags: []
  });

  useEffect(() => {
    getPost(id).then(data => setPost({
      ...data,
      createdAt: formatDate(data.createdAt)
    }));
  }, [id]);

  const handleEditPost = () => navigate(`/edit/${id}`);

  const handleDeletePost = () =>
    deletePost(id).then(data => {
      if (data.status === 200)
        navigate('/');
    });

  return (
    <Container fluid className="postPage">
      <Row className="postPage_header">
        <Col md={8} className="postPage_headerTitle">
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
        </Col>
        <Col md={2} className="postPage_headerActions">
          <Button variant='dark' onClick={handleEditPost}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button variant='dark' onClick={handleDeletePost}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="postPage_content">
          <div className="content" dangerouslySetInnerHTML={{__html: post.body}} />
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
