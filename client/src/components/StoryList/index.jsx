import React from 'react';
import { Link } from 'react-router-dom';

const StoryList = ({ stories }) => {
  return (
    <div>
      <h3>Recent Stories</h3>
      {stories.length ? (
        <div>
          {stories.map((story) => (
            <div key={story._id} className="card mb-3 justfy-space-between-md mr-3">
              <div className="card-header bg-primary text-light p-2 m-0">
                <Link
                  className="text-light"
                  to={`/stories/${story._id}`}
                >
                  {story.title} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Created on {new Date(story.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </div>
              <div className="card-body bg-light p-2">
                <p>{story.content}</p>
              </div>
              {/* Additional styling for the StoryList component */}
              <div className="card-footer bg-light p-2">
                <div className="postActions" style={{ textAlign: 'center', color: 'white' }}>
                  {/* Add any additional actions or buttons here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4>No stories yet</h4>
      )}
    </div>
  );
};

export default StoryList;