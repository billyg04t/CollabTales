import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries';
import "./Page's.css";
import MyCalendar from './MyCalendar';
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
    <div className="dashboardContainer" style={{ backgroundImage: 'url("https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg")', backgroundSize: 'cover', background: 'fixed' }}>
  <div className="collabTalesTitleContainer" style={{ backgroundColor: '#333', padding: '10px' }}>
        {/* Updated h1 element without a link */}
        <div className="collabTalesTitleContainer" style={{ backgroundColor: '#333', padding: '10px' }}>
          <h1 className="collabTalesHeader" style={{ fontFamily: "'Frank Ruhl Libre', italic", fontWeight: 'bold', color: 'white' }}>
            CollabTales
          </h1>
        </div>
        {/* Navbar with login/signup buttons */}
        <nav className="navbar" style={{ backgroundColor: '#333' }}>
    <Link to="/dashboard" className="navLink" style={{ color: 'white' }}>Home</Link>
    <Link to="/user" className="profile navLink" style={{ color: 'white' }}>Profile</Link>

       {/* Logout button */}
    <div className="authButton">
      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
      ) : (
        <Link to="/" className="navLink" style={{ color: 'white' }}>Logout</Link>
      )}
    </div>
  </nav>
      </div>

      <div className="mainContent">
    <div className="contentWrapper">
      <div className="leftSidebar" style={{ backgroundColor: '#333', color: 'white' }}>
        <MyCalendar />
      </div>

            <div className="mainFeed">             
             {/* Display Recent Stories */}
              <StoryList stories={recentStories} />

              {/* Create Story Form */}
              <StoryForm onCreateStory={handleCreateStory} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;