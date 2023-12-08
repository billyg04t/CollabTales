const React = require('react');
const { useState } = require('react');
const { useQuery } = require('@apollo/client');
const { Link, Route, Switch } = require('react-router-dom');

// Assuming you have a query for recent stories
const { GET_RECENT_STORIES } = require('../utils/queries');

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
      <Switch>
        <Route exact path="/dashboard">
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
                    <Link to={`/dashboard/story/${story._id}`}>View Story</Link>
                    {/* Add a button/link to contribute to the story */}
                    <Link to={`/dashboard/contribute/${story._id}`}>Contribute</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Route>

        {/* Form to create a new story */}
        <Route path="/dashboard/create-story">
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
        </Route>

        {/* Links to user profile and liked stories */}
        <Route path="/dashboard/user-options">
          <div>
            <h2>User Options:</h2>
            <Link to="/dashboard/profile">View Your Profile</Link>
            <br />
            <Link to="/dashboard/liked-stories">View Liked Stories</Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

module.exports = Dashboard;