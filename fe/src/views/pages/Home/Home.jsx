import './Home.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from './components/PostList/PostList';
import { listPosts } from '../../../services/posts.api';

const Home = (props) => {
  const [params, _] = useSearchParams();

  const tag = params.get("t");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    listPosts(tag).then(data => setPosts(data));
  }, []);

  return (
    <div className='home'>
      <PostList tag={tag} posts={posts} />
    </div>
  );
};

export default Home;
