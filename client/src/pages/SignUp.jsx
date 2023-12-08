import React, { useState } from 'react';
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

  const handleSignup = async () => {
    try {
      // Perform form validation (e.g., check if passwords match)
      if (password !== confirmPassword) {
        // Handle password mismatch error
        console.error('Passwords do not match');
        return;
      }

      // Call the ADD_USER mutation
      const { data } = await addUser({
        variables: { username, email, password, },
      });

      if (data.addUser) {
        // Redirect to the login page after successful signup
        history.push('/login');
      } else {
        // Handle signup failure (e.g., username already taken)
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Signup</h1>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
             Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button onClick={handleSignup} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
        <p>
          Already have an account? <Link to="/home">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
