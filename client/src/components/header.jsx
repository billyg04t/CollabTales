import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const renderAuthenticatedLinks = () => (
    <>
      <Link className="btn btn-lg btn-info m-2" to="/me">
        {Auth.getProfile().authenticatedPerson.username}'s profile
      </Link>
      <button className="btn btn-lg btn-light m-2" onClick={handleLogout}>
        Logout
      </button>
    </>
  );

//   const renderGuestLinks = () => (
//     <>
//       <Link className="btn btn-lg btn-info m-2" to="/login">
//         Login
//       </Link>
//       <Link className="btn btn-lg btn-light m-2" to="/signup">
//         Signup
//       </Link>
//     </>
//   );

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">CollabTales</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? renderAuthenticatedLinks() : renderGuestLinks()}
        </div>
      </div>
    </header>
  );
};

export default Header;
