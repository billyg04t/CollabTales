import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ContributionList from '../components/ContributionList';
import ContributionForm from '../components/ContributionForm';
import { GET_STORY } from '../utils/queries';

const SingleStory = () => {
  const { storyId } = useParams();
  const { loading, data } = useQuery(GET_STORY, {
    variables: { storyId: storyId },
  });

  const story = data?.story || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {story.title} <br />
        <span style={{ fontSize: '1rem' }}>
          Created this story on {new Date(story.createdAt).toLocaleDateString()}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {story.storyText}
        </blockquote>
      </div>

      <div className="my-5">
        <ContributionList contributions={story.contributions} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <ContributionForm storyId={story._id} />
      </div>
    </div>
  );
};

export default SingleStory;
