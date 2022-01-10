import './index.css';
import React, { memo } from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar fixed='top'>
      <Navbar.Brand href="#home">
        v13t.blog
      </Navbar.Brand>
    </Navbar>
  );
};

export default memo(NavBar);
