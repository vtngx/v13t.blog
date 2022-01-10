import './index.css';
import PostList from './components/PostList';
import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

const Home = (props) => {
  const params = useSearchParams()[0];

  const tag = params.get("t");

  return (
    <div className='home'>
      <PostList tag={tag} />
    </div>
  );
};

export default memo(Home);
