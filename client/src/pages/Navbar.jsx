import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn();
  
  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div className="dashboardContainer" style={{ backgroundColor: 'rgb(232, 236, 195)' }}>
      <div>
        {/* Updated h1 element without a link */}
        <h1 className="collabTalesHeader">CollabTales</h1>

        {/* Navbar with login/signup buttons */}
        <nav className="navbar">
          <Link to="/" className="navLink">Home</Link>
          <Link to="/user" className="profile navLink">Profile</Link>

          {/* Logout button */}
          <div className="authButton">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/" className="navLink">Logout</Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;