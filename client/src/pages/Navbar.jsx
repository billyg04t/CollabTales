import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout(); // Call the logout function from AuthService
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
          <Link to="/" className="navLink">Home</Link>
          <Link to="/user" className="profile navLink">Profile</Link>
  
          {/* Logout button */}
          <div className="authButton">
            {isLoggedIn ? (
              <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
            ) : (
              <Link to="/" onClick={handleLogout} className="navLink">
                Logout
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
