import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          {localStorage.getItem('points') !== '' ? 
          <button className='btn btn-danger'>{localStorage.getItem('points')} Points</button>:null}&nbsp;&nbsp;&nbsp;
        
          <div class="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="fas fa-user"></i>
              {/* <span class="badge badge-warning navbar-badge">Profile</span> */}
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {/* <span class="dropdown-item dropdown-header">15 Notifications</span> */}
              <div className="dropdown-divider"></div>
              {import.meta.env.VITE_BASE_API_URL ==
              "http://localhost:7000/admin" ? (
                <a href="http://localhost:5173" class="dropdown-item">
                  <i className="fas fa-right-from-bracket"></i> Logout
                </a>
              ) : (
                <a href="https://wondervision.in/admin" class="dropdown-item">
                  <i className="fas fa-right-from-bracket"></i> Logout
                </a>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
