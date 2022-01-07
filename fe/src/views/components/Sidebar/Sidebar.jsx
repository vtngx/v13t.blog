import './Sidebar.css';
import PropTypes from 'prop-types';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

const Sidebar = props => {
  const { tags } = props;
  const [user, setUser] = useState({
    name: '',
    username: '',
  });

  useEffect(() => {
    setUser({
      name: 'Viet Nguyen',
      username: 'vietnh'
    });
  }, []);

  return (
    <>
      <Nav className="d-none d-md-block sidebar"
        activeKey="/home"
      >
        {/* profile */}
        <Nav.Item>
          <FontAwesomeIcon icon={faUser} />
          <b>{user.name}</b> <small>(<i>{user.username}</i>)</small>
        </Nav.Item>
        
        <div className='sidebar_navs'>
          {/* home */}
          <Nav.Item>
            <a href="/">home</a>
          </Nav.Item>

          {/* tags */}
          {[...tags].map(tag => (
            <Nav.Item key={tag._id}>
              <a href={`/?t=${tag?._id}`}>{tag?.name?.toLowerCase()}</a>
            </Nav.Item>
          ))}

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


        {/* auth */}
      </Nav>
    </>
  );
};

Sidebar.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default Sidebar;