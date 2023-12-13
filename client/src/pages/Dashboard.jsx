import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries';
import { CREATE_STORY } from '../utils/mutations';
import "./Page's.css"
import MyCalendar from './MyCalendar';
import Navbar from './Navbar';
const Dashboard = () => {
  // Use your query for recent stories
  const handleLogout = () => {
    // Implement your logout logic here
    // You may need to clear authentication tokens or perform any necessary cleanup
    setIsLoggedOut(false);
  };
  const { loading: storiesLoading, data: storiesData, refetch: refetchRecentStories } = useQuery(
    GET_RECENT_STORIES,
    {
      fetchPolicy: 'no-cache',
    }
  );
// Sets the navbar to login or signout stage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
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
  const recentStories = storiesData?.recentStories || []
  console.log(storiesData)
  const [newStoryTitle, setNewStoryTitle] = useState('');
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
    <div className="dashboardContainer" style={{ backgroundImage: 'url("https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg")', backgroundSize: 'cover', background: 'fixed'}}>
      <div className="collabTalesTitleContainer" style={{ backgroundColor: '#333', padding: '10px' }}>
        <h1 className="collabTalesHeader" style={{ fontFamily: "'Frank Ruhl Libre', italic", fontWeight: 'bold', color: 'white' }}>
          CollabTales
        </h1>
      </div>
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
      <div className="mainContent">
        <div className="contentWrapper">
          <div className="leftSidebar" style={{ backgroundColor: '#333', color: 'white' }}>
            <MyCalendar />
          </div>
          <div className="mainFeed">
            <div className="postForm" style={{ margin: 'auto', width: '50%', backgroundColor: '#333', padding: '20px', borderRadius: '10px', marginTop: '20px', color: 'white' }}>
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', color: 'black' }}
              />
              <button onClick={handleCreatePost}>Post</button>
            </div>
            {posts.map((post) => (
              <div key={post.id} className="postCard">
                <div className="postHeader">
                  <img src="profile-picture.jpg" alt="User Avatar" className="avatar" />
                  <div>
                    <p className="username" style={{ color: 'black', textAlign: 'center' }}>{post.username}</p>
                    <p className="timestamp" style={{ color: 'black', textAlign: 'center' }}>{post.timestamp}</p>
                  </div>
                </div>
                <div className="postContent" style={{ backgroundColor: '#333', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', margin: '10px 0' }}>
                  <p>{post.content}</p>
                </div>
                <div className="postActions"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
