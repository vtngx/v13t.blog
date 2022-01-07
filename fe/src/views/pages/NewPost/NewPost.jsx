import './NewPost.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { listTags } from '../../../services/tags.api';
import { uploadFile } from '../../../services/files.api';
import { createPost } from '../../../services/posts.api';
import PostForm from '../../components/PostForm/PostForm';
import PreviewModal from '../../components/PreviewModal/PreviewModal';

const NewPost = (props) => {
  const navigate = useNavigate();

  const [bodyContent, setBodyContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState({
    tags: [],
    _id: '',
    body: '',
    title: '',
    userId: '',
    createdAt: '',
    thumbnail: '',
  });

  // init data
  useEffect(() => {
    listTags().then(data => setTags(data));
  }, []);

  // handle changes
  const handleFileChange = e => setSelectedFile(e.target.files[0]);
  const handleContentChange = data => {
    setBodyContent(data)
    setPost({ ...post, body: data })
  };
  const handleInputChange = e => setPost({
    ...post,
    [e.target.name]: e.target.value
  });
  const handleTagSelectChange = e => setPost({
    ...post,
    tags: [tags.find(t => t.name === e.target.value)]
  });

  // handle form submit
  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );

    uploadFile(formData)
      .then(thumbnail => {
        createPost({ ...post, body: bodyContent, thumbnail })
          .then(res => navigate(`/`))
          .catch(err => window.alert("Update Failed"))

      })
      .catch(err => window.alert("Upload File Failed"));
  };

  // handle cancel
  const handleCancel = () => navigate(`/`);

  // handle preview
  const handlePreview = () => setShowPreview(true);
  const handleClosePreview = () => setShowPreview(false);

  return (
    <Container fluid className="newPost">
      <PostForm
        post={post}
        tags={tags}
        bodyContent={bodyContent}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handlePreview={handlePreview}
        handleFileInput={handleFileChange}
        handleInputChange={handleInputChange}
        handleContentChange={handleContentChange}
        handleTagSelectChange={handleTagSelectChange}
      />
      <PreviewModal
        post={post}
        showPreview={showPreview}
        handleClosePreview={handleClosePreview}
      />
    </Container>
  );
};

export default NewPost;
