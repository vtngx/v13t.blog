import './index.css';
import { useEffect, useState } from "react";
import PostTitle from './components/PostTitle';
import formatDate from "../../../utils/formatDate";
import PostActions from './components/PostActions';
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost } from "../../../services/posts.api";

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
          <PostTitle post={post} />
        </Col>
        <Col md={2} className="postPage_headerActions">
          <PostActions
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={8}
          className="postPage_content"
          dangerouslySetInnerHTML={{__html: post.body}}
        />
      </Row>
    </Container>
  );
};

export default Post;
