// CollabTale.js
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

// Define GraphQL queries and mutations
const GET_CONTRIBUTIONS = gql`
  query {
    contributions {
      id
      text
      author
    }
  }
`;

const ADD_CONTRIBUTION = gql`
  mutation AddContribution($text: String!, $author: String!) {
    addContribution(text: $text, author: $author) {
      id
      text
      author
    }
  }
`;

// Main component for CollabTale
function CollabTale() {
  // State to manage input values and book state
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [bookOpen, setBookOpen] = useState(false);

  // Apollo Client hooks for querying and mutating data
  const { loading, error, data, refetch } = useQuery(GET_CONTRIBUTIONS);
  const [addContribution] = useMutation(ADD_CONTRIBUTION);

  // Function to handle adding a new contribution
  const handleAddContribution = async () => {
    try {
      await addContribution({ variables: { text, author } });
      // Refetch contributions to update the UI
      refetch();
      // Clear input fields
      setText('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding contribution:', error.message);
    }
  };

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>Error: {error.message}</p>;

  // Render contributions
  const contributions = data.contributions.map(contribution => (
    <li key={contribution.id}>
      {contribution.text} - {contribution.author}
    </li>
  ));

  // Render main component with book background
  return (
    <div className={`collab-tale ${bookOpen ? 'book-open' : ''}`}>
      <h1>CollabTale</h1>
      <div className="book" onClick={() => setBookOpen(true)}>
        <div className="cover"></div>
        <div className="first-page">
          <h2>Welcome to CollabTale!</h2>
          <p>Sign in to start writing the story.</p>
        </div>
      </div>
      <ul>{contributions}</ul>
      <div>
        <input
          type="text"
          placeholder="Your contribution"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button onClick={handleAddContribution}>Add Contribution</button>
      </div>
    </div>
  );
}

export default CollabTale;
