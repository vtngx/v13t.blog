import './index.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

const Post = (props) => {
  const { post, index } = props;

  return (
    <Col sm={12} lg={6} key={post._id} className='post'>
      <Card>
        <Card.Header className='post_header'>
          <p>
            {index < 9
              ? `0${index + 1}.`
              : `${index + 1}.`
            }
          </p>
          <Link to={`/post/${post._id}`} title={post.title}>
            {String(post.title).length > 30
              ? `${String(post.title).substring(0, 30)}...`
              : post.title
            }
          </Link>
        </Card.Header>
        <Link to={`/post/${post._id}`} title={post.title}>
          <Card.Img
            variant='bottom'
            src={post.thumbnail}
          />
        </Link>
      </Card>
    </Col>
  );
};

Post.propTypes = {
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
  index: PropTypes.number.isRequired
};

export default Post;