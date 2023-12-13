import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_STORY } from '../../utils/mutations';
import { GET_RECENT_STORIES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const StoryForm = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [storyGenre, setStoryGenre] = useState('');
  
  const [addStory, { error }] = useMutation(ADD_STORY, {
    refetchQueries: [GET_RECENT_STORIES, 'getStories', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addStory({
        variables: {
          title: storyTitle,
          content: storyContent,
          genre: storyGenre,
        },
      });

      if (data && data.addStory) {
        setStoryTitle('');
        setStoryContent('');
        setStoryGenre('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'storyTitle') {
      setStoryTitle(value);
    } else if (name === 'storyContent') {
      setStoryContent(value);
    } else if (name === 'storyGenre') {
      setStoryGenre(value);
    }
  };

  return (
    <div>
      <h3>Share Your Story</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
              <input
                type="text"
                name="storyTitle"
                placeholder="Enter the title of your story..."
                value={storyTitle}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <input
                type="text"
                name="storyGenre"
                placeholder="Enter the genre of your story..."
                value={storyGenre}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <textarea
                name="storyContent"
                placeholder="Tell your story..."
                value={storyContent}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary btn-block py-3"
                type="submit"
              >
                Share Story
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                Error: {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your story. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default StoryForm;
