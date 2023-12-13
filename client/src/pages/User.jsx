import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
//import StoryForm from './components/StoryForm';
//import ContributionList from '../components/ContributionList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user) 
  if (
    Auth.loggedIn() && 
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      {/* Navbar with login/signup buttons */}
      <Navbar />
  
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: 'white' }}>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile
        </h2>
  
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4" style={{ backgroundColor: '#333', color: 'white' }}>
              <div className="card-body">
                <h3 className="card-title">User Information</h3>
                <p className="card-text">User Name: {user.username}</p>
                <p className="card-text">Email: {user.email}</p>
              </div>
            </div>
  
            <div className="card" style={{ backgroundColor: '#333', color: 'white' }}>
              <div className="card-body">
                <h3 className="card-title">Contributions</h3>
                {user.contributions.length > 0 ? (
                  <ul className="list-group">
                    {user.contributions.map((contribution) => (
                      <li key={contribution._id} className="list-group-item">
                        <h5>{contribution.title}</h5>
                        <p>{contribution.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No contributions yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {!userParam && (
          <div className="row justify-content-center mt-4">
            <div className="col-md-8">
  
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
