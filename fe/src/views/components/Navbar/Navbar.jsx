import './Navbar.css';
import React from 'react';
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

export default NavBar;
