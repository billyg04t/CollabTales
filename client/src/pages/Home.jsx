import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_QUERY } from '../utils/queries';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import "./Page's.css";

const Home = () => {
  const navigate = useNavigate();
  const { loading: authLoading, error: authError, data: authData } = useQuery(AUTH_QUERY);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      console.log('Email:', email);
      console.log('Password:', password);
  
      const { data } = await loginUser({
        variables: { email, password },
      });
  
      const { token } = loginResult.data.login;
      AuthService.login(token);  // Use AuthService to handle login
  
      // Use navigate instead of history.push
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.message.includes('User not found') || error.message.includes('Incorrect password')) {
        console.error('Authentication failed:', error.message);
        // Handle the authentication failure (e.g., display an error message to the user)
      } else {
        // Handle other error scenarios
        console.error('An error occurred during login:', error.message);
      }
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
                      Email:
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                  </div>
                  <div className="custom-form-group">
                    <label className="form-label">
                      Password:
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                  </div>
                  <div className="button-container">
                    <button className="btn btn-success" onClick={handleLogin} disabled={false}>
                      Log In
                    </button>
                    <Link to="/signup">
                      <button className="btn btn-success">Sign Up</button>
                    </Link>
                  </div>
                </div>
                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;