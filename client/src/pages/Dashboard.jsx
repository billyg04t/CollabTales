import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries';
import { CREATE_STORY } from '../utils/mutations';
import "./Page's.css"
import MyCalendar from './MyCalendar';
import Weather from './WeatherWidge';
import StoryList from '../components/StoryList';
import StoryForm from '../components/StoryForm';

const Dashboard = () => {
  // Use your query for recent stories
  const { loading: storiesLoading, data: storiesData, refetch: refetchRecentStories } = useQuery(
    GET_RECENT_STORIES,
    {
      fetchPolicy: 'no-cache',
    }
  );

  // Sets the navbar to login or signout stage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [newStoryTitle, setNewStoryTitle] = useState('');

  const handleCreatePost = () => {
    // Create a new post object with the current timestamp
    const newPost = {
      id: Date.now(), 
      username: 'Username', // Replace with the actual username or fetch from authentication
      timestamp: new Date().toLocaleString(),
      content: newPostContent,
    };
    setPosts([newPost, ...posts]);

    setNewPostContent('');
  };

  const recentStories = storiesData?.recentStories || [];

  // Use the mutation hook for creating a new story
  const [createStoryMutation, { loading: createStoryLoading }] = useMutation(
    CREATE_STORY,
    {
      // Optionally, you can update the cache or refetch queries after a successful mutation
      // update: (cache, { data: { createStory } }) => {
      //   // Update the cache or refetch queries as needed
      // },
    }
  );

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
      <div className="dashboardContainer" style={{ backgroundColor: 'rgb(232, 236, 195)' }}>
        <div>
          {/* Updated h1 element without a link */}
          <h1 className="collabTalesHeader">CollabTales</h1>

          {/* Navbar with login/signup buttons */}
          <nav className="navbar">
            
            <Link to="/" className="navLink">Home</Link>
            <Link to="/profile" className="profile navLink ">Profile</Link>
            
            {/* Login/Signup button */}
            <div className="authButton">
              {isLoggedIn ? (
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
              ) : (
                <>
                  <Link to="/" className="navLink">Login</Link>
                  <span className="orText">or</span>
                  <Link to="/signup" className="navLink">Signup</Link>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="mainContent">
          {/* Left Sidebar */}
          <div className="leftSidebar">
            {/* Calendar component */}
            <MyCalendar />
          </div>

          {/* Main Feed */}
          <div className="mainFeed">
            {/* Create Post Form */}
            <div className="postForm">
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <button onClick={handleCreatePost}>Post</button>
            </div>

            {/* Display Posts */}
            {posts.map((post) => (
              <div key={post.id} className="postCard">
                <div className="postHeader">
                  <img src="profile-picture.jpg" alt="User Avatar" className="avatar" />
                  <div>
                    <p className="username">{post.username}</p>
                    <p className="timestamp">{post.timestamp}</p>
                  </div>
                </div>
                <div className="postContent">
                  <p>{post.content}</p>
                </div>
                <div className="postActions"></div>
              </div>
            ))}

            {/* Display Recent Stories */}
            <div className="recentStories">
              <h2>Recent Stories</h2>
              {recentStories.map((story) => (
                <div key={story.id} className="clr">
                  <h3>{story.title}</h3>
                  {/* ... (display other story details) ... */}
                </div>
              ))}
            </div>

            {/* Create Story Form */}
            <div>
              <h2>Create a New Story:</h2>
              <label>
                Title:
                <input
                  type="text"
                  value={newStoryTitle}
                  onChange={(e) => setNewStoryTitle(e.target.value)}
                />
              </label>
              <button onClick={handleCreateStory} disabled={createStoryLoading}>
                {createStoryLoading ? 'Creating...' : 'Create Story'}
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="rightSidebar">
            {/* Include Weather component */}
            <Weather />
            {/* Text on the right side */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
