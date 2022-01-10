import NavBar from '../Navbar';
import Sidebar from '../Sidebar';
import Home from '../../pages/Home';
import Post from '../../pages/Post';
import NewTag from '../../pages/NewTag';
import NewPost from '../../pages/NewPost';
import EditPost from '../../pages/EditPost';
import { Container, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { TagsProvider } from '../../../providers/TagsProvider';

const PageWrapper = (props) => {
  return (
    <TagsProvider>
      <Container fluid>
        {/* navbar */}
        <NavBar />

        {/* sidebar */}
        <Col md={3}>
          <Sidebar />
        </Col>

        {/* page content */}
        <div id="home" />
        <Col md={{ span: 9, offset: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-tag" element={<NewTag />} />
              <Route path="/new" element={<NewPost />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
        </Col>
      </Container>
    </TagsProvider>
  );
};

export default PageWrapper;
