import './index.css';
import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import SidebarTags from './SidebarTags';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

const Sidebar = props => {
  const user = {
    name: 'Viet Nguyen',
    username: 'vietnh',
  };

  return (
    <>
      <Nav className="d-none d-md-block sidebar">
        {/* profile */}
        <Nav.Item>
          <FontAwesomeIcon icon={faUser} />
          <b>{user.name}</b> <small>(<i>{user.username}</i>)</small>
        </Nav.Item>
        
        <div className='sidebar_navs'>
          {/* home */}
          <Nav.Item>
            <Link to="/">home</Link>
          </Nav.Item>

          {/* tags */}
          <div className='sidebar_navs_tags'>
            <SidebarTags />
          </div>

          <div className='sidebar_navs_new'>
            {/* new tag */}
            <Nav.Item>
              <Link to="/new-tag"><FontAwesomeIcon icon={faPlus} />new tag</Link>
            </Nav.Item>

            {/* new post */}
            <Nav.Item>
              <Link to="/new"><FontAwesomeIcon icon={faPlus} />new post</Link>
            </Nav.Item>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default memo(Sidebar);