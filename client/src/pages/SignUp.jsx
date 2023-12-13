import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

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
  <div className="w-25"> {/* Adjusted width here */}
    <div className="card-body bg-dark text-center rounded" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
      <h1 className="card-title" style={{ color: 'white' }}>Signup</h1>
      <div className="form-container" style={{ padding: '20px' }}>
        <div className="d-flex flex-column">
          <label className="text-white">
            Username:
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="text-white">
            Email:
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="d-flex flex-column">
          <label className="text-white">
            Password:
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="text-white">
            Confirm Password:
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-3">
          <button className="btn btn-success rounded-pill" onClick={handleSignup} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </div>
      <p style={{ color: 'white', marginTop: '20px' }}>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default Signup;