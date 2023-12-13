import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries';
import "./Page's.css";
import MyCalendar from './MyCalendar';
import Weather from './WeatherWidge';
import Navbar from './Navbar';
import StoryList from '../components/StoryList';
import StoryForm from '../components/StoryForm';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [newStoryTitle, setNewStoryTitle] = useState('');

  const { loading: storiesLoading, data: storiesData, refetch: refetchRecentStories } = useQuery(
    GET_RECENT_STORIES,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const recentStories = storiesData?.recentStories || [];

  const handleCreateStory = async () => {
    try {
      const response = await createStoryMutation({
        variables: { title: newStoryTitle },
      });

      const newStory = response.data.createStory;

      console.log('New story created:', newStory);

      setNewStoryTitle('');

      refetchRecentStories();
    } catch (error) {
      console.error('Error creating a new story:', error);
    }
  };

  return (
    <div>
      {/* CollabTales Title and Navbar */}
      <div className="dashboardContainer" style={{ backgroundColor: 'rgb(232, 236, 195)', minHeight: '100vh' }}>
        <div>
          {/* Updated h1 element without a link */}
          <h1 className="collabTalesHeader">CollabTales</h1>

          {/* Navbar with login/signup buttons */}
          <nav className="navbar">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/User" className="profile navLink ">Profile</Link>

            {/* Logout button */}
            <div className="authButton">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link to="/" className="navLink">Logout</Link>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="mainContent">
          <div className="contentWrapper">
            <div className="leftSidebar">
              {/* Calendar component */}
              <MyCalendar />
            </div>

            <div className="mainFeed">             
             {/* Display Recent Stories */}
              <StoryList stories={recentStories} />

              {/* Create Story Form */}
              <StoryForm onCreateStory={handleCreateStory} />
            </div>

            <div className="rightSidebar">
              {/* Include Weather component */}
              <Weather />
              {/* Text on the right side */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
