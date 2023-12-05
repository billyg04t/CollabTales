import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_QUERY, GET_STORY } from '../utils/queries';

const Home = () => {
  // Use your authentication query or mutation here
  const { loading: authLoading, data: authData } = useQuery(AUTH_QUERY);

  // Fetch stories data
  const { loading: storiesLoading, data: storiesData } = useQuery(GET_STORY, {
    fetchPolicy: 'no-cache',
  });

  const storyList = storiesData?.stories || [];

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>CollabTales</h1>
        {/* Render user authentication status here */}
        {authLoading ? (
          <div>Loading authentication...</div>
        ) : (
          <div>
            {authData?.user ? (
              <p>Welcome, {authData.user.username}!</p>
            ) : (
              <p>Please log in or sign up to get started!</p>
            )}
          </div>
        )}
      </div>

      <div className="card-body m-5">
        {/* Render dashboard content here */}
        <h2>Current Stories:</h2>
        {/* Display story contributors and recent updates */}

        {/* Render story display with contributions */}
        {storiesLoading ? (
          <div>Loading stories...</div>
        ) : (
          <div>
            <h3>Story List:</h3>
            {/* Render stories here */}
            <ul className="square">
              {storyList.map((story) => (
                <li key={story._id}>
                  <Link to={{ pathname: `/story/${story._id}` }}>
                    {story.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Render contribution form here */}
      <div className="card-footer text-center m-3">
        <h2>Contribute to a Story:</h2>
        {/* Provide a form or input area for contributions */}
        {/* Include text formatting or styling options */}
        <Link to="/story">
          <button className="btn btn-lg btn-danger">Create Contribution!</button>
        </Link>
      </div>

      {/* Additional sections for real-time updates, user interaction, user-friendly design, error handling, mobile responsiveness, and testing */}
    </div>
  );
};

export default Home;
