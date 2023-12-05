import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_STORY } from '../utils/mutations';
import storyRoutes from './server/routes/storyRoutes';

const Story = () => {
  const [formData, setFormData] = useState({
    title: 'Untitled Story',
    content: '',
  });

  const navigate = useNavigate();

  const [createStory, { error }] = useMutation(CREATE_STORY);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createStory({
        variables: { ...formData },
      });

      // Redirect to the dashboard or wherever you want after creating the story
      navigate(`/dashboard`);
    } catch (err) {
      console.error(err);
    }

    // Reset the form data
    setFormData({
      title: 'Untitled Story',
      content: '',
    });
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Create Your Story</h1>
      </div>
      <div className="card-body m-5">
        <form onSubmit={handleFormSubmit}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <label>Content: </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
          <button className="btn btn-danger" type="submit">
            Create Story!
          </button>
        </form>
      </div>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default Story;
