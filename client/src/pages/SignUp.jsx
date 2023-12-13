import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import "./Page's.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Use the ADD_USER mutation
  const [addUser, { loading }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Perform form validation (e.g., check if passwords match)
      if (password !== confirmPassword) {
        // Handle password mismatch error
        console.error('Passwords do not match');
        return;
      }
  
      // Call the ADD_USER mutation
      const { data, errors } = await addUser({
        variables: { username, email, password },
      });
  
      console.log('Mutation Response:', data);
      console.log('Mutation Errors:', errors);
  
      if (data?.addUser?.token) {
        // Redirect to the login page after successful signup
        navigate('/');
      } else {
        // Handle signup failure
        console.error('Signup failed:', errors);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="off-white-background d-flex align-items-center justify-content-center vh-100">
      <div className="card card-rounded w-75" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark text-center">
          <h1>Signup</h1>
          <div className="form-group mb-3">
            <label className="text-end">Username:</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group mb-3">
            <label className="text-end">Email:</label>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group mb-3">
            <label className="text-end">Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group mb-3">
            <label className="text-end">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-success" onClick={handleSignup} disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
          <p className="text-center mt-2">
            Already have an account? <Link to="/">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );   
};

export default Signup;