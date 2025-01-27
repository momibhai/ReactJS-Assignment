import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';


const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username


  function signOut(e) {
    e.preventDefault();
    logout(); // Call the logout function from AuthContext
    navigate('/login');
    localStorage.clear();
  }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">NiceAdmin</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-a nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-a nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-a nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                  <div>
                    <h4>Anna Nelson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>6 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="message-item">
                <a href="#">
                  <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                  <div>
                    <h4>David Muldon</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>8 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="dropdown-footer">
                <a href="#">Show all messages</a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
      <a
        className="nav-a nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        {/* Profile image */}
        <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
        
        {/* Username display */}
        <span className="d-none d-md-block dropdown-toggle ps-2">{username}</span>
      </a>
      
      {/* Dropdown menu */}
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          {/* Display user name */}
          <h6>{username}</h6>
          <span>Web Designer</span> {/* This can be dynamic if needed */}
        </li>
        <li><hr className="dropdown-divider" /></li>
        
        {/* My Profile option */}
        <li>
          <a className="dropdown-item d-flex align-items-center" to="/profile">
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        
        {/* Account Settings */}
        <li>
          <a className="dropdown-item d-flex align-items-center" to="/settings">
            <i className="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        
        {/* Help Section */}
        <li>
          <a className="dropdown-item d-flex align-items-center" to="/help">
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        
        {/* Logout button */}
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={signOut}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
