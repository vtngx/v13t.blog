import './index.css';
import { Container } from 'react-bootstrap';
import PostForm from '../../components/PostForm';
import React, { useState, useEffect } from 'react';
import { listTags } from '../../../services/tags.api';
import { uploadFile } from '../../../services/files.api';
import PreviewModal from '../../components/PreviewModal';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../../../services/posts.api';

const EditPost = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();
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
    author: { _id: '', name: '' },
  });

  // init data
  useEffect(() => {
    getPost(id).then(data => {
      setPost(data);
      setBodyContent(data.body);
    });
    listTags().then(data => setTags(data));
  }, [id]);

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

    if (selectedFile) {
      const formData = new FormData();
      formData.append(
        "file",
        selectedFile,
        selectedFile.name
      );
  
      uploadFile(formData)
        .then(thumbnail => {
          updatePost(id, { ...post, body: bodyContent, thumbnail })
            .then(res => navigate(`/post/${id}`))
            .catch(err => window.alert("Update Failed"));
  
        })
        .catch(err => window.alert("Upload File Failed"));
    } else {
      updatePost(id, { ...post, body: bodyContent })
        .then(res => navigate(`/post/${id}`))
        .catch(err => window.alert("Update Failed"));
    }
  };

  // handle cancel
  const handleCancel = () => navigate(`/post/${id}`);

  // handle preview
  const handlePreview = () => setShowPreview(true);
  const handleClosePreview = () => setShowPreview(false);

  return (
    <Container fluid className="editPage">
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

export default EditPost;
