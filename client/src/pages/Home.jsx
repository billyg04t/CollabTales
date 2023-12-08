// Import useNavigate instead of useHistory
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_QUERY } from '../utils/queries';
import { LOGIN_USER } from '../utils/mutations';
import "./Page's.css"

const Home = () => {
  // Use useNavigate instead of useHistory
  const navigate = useNavigate();
  const { loading: authLoading, data: authData } = useQuery(AUTH_QUERY);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { username, password },
      });

      const { token } = data.login;
      localStorage.setItem('token', token);

      // Use navigate instead of history.push
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="off-white-background card" style={{ border: 'none' }}>
      <div className="card-header card card-rounded bg-dark text-center">
        <h1>CollabTales</h1>
        {authLoading ? (
          <div>Loading authentication...</div>
        ) : (
          <div>
            {authData?.user ? (
              <p>Welcome, {authData.user.username}!</p>
            ) : (
              <div>
                <p>Please log in or sign up to get started!</p>
                <div className="custom-form-group">
                  <div className="custom-form-group"> 
                  <label className="form-label">
                    Username: 
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </label>
                  </div>
                  <div className="custom-form-group">
                  <label className="form-label">
                    Password:  
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  </div>
                  <div className= "button-container">
                  <button className="btn btn-success" onClick={handleLogin} disabled={false} >
                    Log In
                  </button>
                <Link to="/signup">
                  <button className="btn btn-success">Sign Up</button>
                </Link>
                </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
