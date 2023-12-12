import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries';
import { CREATE_STORY } from '../utils/mutations';
import "./Page's.css";
import MyCalendar from './MyCalendar';
import Weather from './WeatherWidge';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [newStoryTitle, setNewStoryTitle] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    // Implement any other logout logic here
  };

  const { loading: storiesLoading, data: storiesData, refetch: refetchRecentStories } = useQuery(
    GET_RECENT_STORIES,
    {
      fetchPolicy: 'no-cache',
    }
  );

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
      <div className="dashboardContainer" style={{ backgroundColor: 'rgb(232, 236, 195)', minHeight: '100vh' }}>
        <div>
          <h1 className="collabTalesHeader">CollabTales</h1>

          {/* Navbar with login/logout button */}
          <nav className="navbar">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/profile" className="profile navLink ">Profile</Link>
            

            {/* Logout button */}
            <div className="authButton">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/" className="navLink">Login</Link>
              )}
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="mainContent">
          <div className="contentWrapper">
            {/* Left Sidebar */}
            <div className="leftSidebar">
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
                <button onClick={() => handleCreatePost()}>Post</button>
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
              <StoryList stories={storiesData?.recentStories || []} />

              {/* Create Story Form */}
              <StoryForm />
            </div>

            {/* Right Sidebar */}
            <div className="rightSidebar">
              <Weather />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
