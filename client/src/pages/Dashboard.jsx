import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

// Import your GraphQL queries and mutations
import { GET_RECENT_STORIES, CREATE_STORY_MUTATION } from './graphql'; // Adjust the path accordingly

const Dashboard = () => {
  // Use your query for recent stories
  const { loading: storiesLoading, data: storiesData, refetch: refetchRecentStories } = useQuery(
    GET_RECENT_STORIES,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const [newStoryTitle, setNewStoryTitle] = useState('');

  // Use the mutation hook for creating a new story
  const [createStoryMutation, { loading: createStoryLoading }] = useMutation(
    CREATE_STORY_MUTATION,
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
      <h1>Dashboard</h1>

      {/* Display most recent stories */}
      <div>
        <h2>Most Recent Stories:</h2>
        {storiesLoading ? (
          <div>Loading stories...</div>
        ) : (
          <ul>
            {storiesData.recentStories.map((story) => (
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
        <button onClick={handleCreateStory} disabled={createStoryLoading}>
          {createStoryLoading ? 'Creating...' : 'Create Story'}
        </button>
      </div>

      {/* Links to user profile and liked stories */}
      <div>
        <h2>User Options:</h2>
        <Link to="/profile">View Your Profile</Link>
        <br />
      </div>
    </div>
  );
};

export default Dashboard;
