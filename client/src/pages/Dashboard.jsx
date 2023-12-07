import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECENT_STORIES } from '../utils/queries'; // Assuming you have a query for recent stories

const Dashboard = () => {
  // Use your query for recent stories
  const { loading: storiesLoading, data: storiesData } = useQuery(GET_RECENT_STORIES, {
    fetchPolicy: 'no-cache',
  });

  const recentStories = storiesData?.recentStories || [];

  // State for creating a new story
  const [newStoryTitle, setNewStoryTitle] = useState('');

  const handleCreateStory = async () => {
    try {
      // Call your API endpoint to create a new story here
      // You might need to use a mutation instead of a query for this operation
      // Example: const response = await createStoryMutation({ variables: { title: newStoryTitle } });

      // After creating the story, you can refetch the recent stories if needed
      // refetchRecentStories();

      // For simplicity, let's log the new story title for now
      console.log('New story created:', newStoryTitle);
    } catch (error) {
      console.error('Error creating a new story:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Display most recent stories */}
      <div>
        <h2>Most Recent Stories:</h2>
        {storiesLoading ? (
          <div>Loading stories...</div>
        ) : (
          <ul>
            {recentStories.map((story) => (
              <li key={story._id}>
                <h3>{story.title}</h3>
                <p>Author: {story.author.username}</p>
                {/* Add a link to view the full story or contribute */}
                <Link to={`/story/${story._id}`}>View Story</Link>
                {/* Add a button/link to contribute to the story */}
                <Link to={`/contribute/${story._id}`}>Contribute</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form to create a new story */}
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
        <button onClick={handleCreateStory}>Create Story</button>
      </div>

      {/* Links to user profile and liked stories */}
      <div>
        <h2>User Options:</h2>
        <Link to="/profile">View Your Profile</Link>
        <br />
        <Link to="/liked-stories">View Liked Stories</Link>
      </div>
    </div>
  );
};

export default Dashboard;
