// Import useNavigate instead of useHistory
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_QUERY } from '../utils/queries';

const Home = () => {
  // Use useNavigate instead of useHistory
  const navigate = useNavigate();
  const { loading: authLoading, data: authData } = useQuery(AUTH_QUERY);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);

        // Use navigate instead of history.push
        navigate('/dashboard');
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
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
                <div>
                  <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </label>
                  <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <button onClick={handleLogin} disabled={false}>
                    Log In
                  </button>
                </div>
                <Link to="/signup">
                  <button className="btn btn-success">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
