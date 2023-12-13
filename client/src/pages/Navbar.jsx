import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn();
  
  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div className="dashboardContainer" style={{ backgroundColor: '#333' }}>
      <div>
        {/* Updated h1 element without a link */}
        <h1 className="collabTalesHeader" style={{ fontFamily: "'Frank Ruhl Libre', italic", fontWeight: 'bold', color: 'white' }}>
          CollabTales
        </h1>
  
        {/* Navbar with login/signup buttons */}
        <nav className="navbar">
          <Link to="/dashboard" className="navLink" style={{ color: 'white' }}>Home</Link>
          <Link to="/user" className="profile navLink" style={{ color: 'white' }}>Profile</Link>
  
          {/* Logout button */}
          <div className="authButton">
            {isLoggedIn ? (
              <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
            ) : (
              <Link to="/" className="navLink" style={{ color: 'white' }}>Logout</Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;