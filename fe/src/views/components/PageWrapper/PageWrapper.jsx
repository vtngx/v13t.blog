import NavBar from '../Navbar/Navbar';
import Home from '../../pages/Home/Home';
import Post from '../../pages/Post/Post';
import Sidebar from '../Sidebar/Sidebar';
import NewTag from '../../pages/NewTag/NewTag';
import { Container, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NewPost from '../../pages/NewPost/NewPost';
import React, { useEffect, useState } from 'react';
import EditPost from '../../pages/EditPost/EditPost';
import { listTags } from '../../../services/tags.api';

const PageWrapper = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    listTags().then(data => setTags(data));
  }, []);

  const handleTagsChange = () => listTags().then(data => setTags(data));

  return (
    <Container fluid>
      {/* navbar */}
      <NavBar />

      {/* sidebar */}
      <Col md={3}>
        <Sidebar tags={tags} />
      </Col>

      {/* page content */}
      <div id="home" />
      <Col md={{ span: 9, offset: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-tag" element={<NewTag tags={tags} handleTagsChange={handleTagsChange} />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
      </Col>
    </Container>
  );
};

export default PageWrapper;
