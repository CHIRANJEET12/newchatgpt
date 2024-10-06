import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Navbar = ({ username }) => {  // Accept username as a prop
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Traci</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Dashboard</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {username || 'Dropdown'}  
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>

          {/* Right-aligned links for Login and Sign Up */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleLoginClick}>Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
