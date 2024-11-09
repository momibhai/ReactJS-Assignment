import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  const location = useLocation(); // Get the current route

  // Helper function to check if the current path is part of the users section
  const isUsersActive = location.pathname === '/users' || location.pathname === '/users-create';

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        
        {/* Dashboard link */}
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Users section */}
        <li className={`nav-item ${isUsersActive ? 'active' : ''}`}>

          {/* The "collapsed" class should be dynamically added to the link if the users section is active */}
          <Link 
            className={`nav-link collapsed ${isUsersActive ? 'show' : ''}`}
            data-bs-target="#components-nav" 
            data-bs-toggle="collapse" 
            to="#"
          >
            <i className="bi bi-menu-button-wide"></i><span>Users</span>
            <i className={`bi bi-chevron-down ms-auto ${isUsersActive ? 'rotate-180' : ''}`}></i>
          </Link>

          {/* Submenu for Users, will collapse/expand based on the active route */}
          <ul id="components-nav" className={`nav-content collapse ${isUsersActive ? 'show' : ''}`} data-bs-parent="#sidebar-nav">
            <li>
              <Link className="nav-link" to="/users-create">
                <i className="bi bi-circle"></i><span>Create User</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/users">
                <i className="bi bi-circle"></i><span>User CRUD</span>
              </Link>
            </li>
          </ul>
        </li>
        
      </ul>
    </aside>
  );
};

export default Sidebar;
