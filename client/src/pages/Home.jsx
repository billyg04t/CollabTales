import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';

// Assume you have additional queries and mutations for user authentication, dashboard, etc.

const Home = () => {
  // Use your authentication query or mutation here
  const { loading: authLoading, data: authData } = useQuery(AUTH_QUERY);

  // Fetch matchups data
  const { loading: matchupsLoading, data: matchupsData } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: 'no-cache',
  });

  const matchupList = matchupsData?.matchups || [];

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
        <h2>Current Story:</h2>
        {/* Display story contributors and recent updates */}

        {/* Render story display with contributions */}
        {matchupsLoading ? (
          <div>Loading matchups...</div>
        ) : (
          <div>
            <h3>Story Contributors:</h3>
            {/* Render contributors here */}
            <ul className="square">
              {matchupList.map((matchup) => (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Render contribution form here */}
      <div className="card-footer text-center m-3">
        <h2>Contribute to the Story:</h2>
        {/* Provide a form or input area for contributions */}
        {/* Include text formatting or styling options */}
        <Link to="/matchup">
          <button className="btn btn-lg btn-danger">Create Contribution!</button>
        </Link>
      </div>

      {/* Render real-time updates, user interaction, and error handling components here */}

      {/* Additional sections for real-time updates, user interaction, user-friendly design, error handling, mobile responsiveness, and testing */}
    </div>
  );
};

export default Home;
