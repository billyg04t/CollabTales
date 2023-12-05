// User.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries'; // Replace with your actual query
import userRoutes from './server/routes/userRoutes';

const User = () => {
  const { userId } = useParams();

  // Fetch user data based on userId
  const { loading, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  const user = data?.user || {};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>User Profile</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading user profile...</div>
        ) : (
          <div>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            {/* Display other user details or contributions as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;