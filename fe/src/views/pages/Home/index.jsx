import './index.css';
import PostList from './components/PostList';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Home = (props) => {
  const [params, _] = useSearchParams();

  const tag = params.get("t");

  return (
    <div className='home'>
      <PostList tag={tag} />
    </div>
  );
};

export default Home;
