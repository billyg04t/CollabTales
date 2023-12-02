// queries.js

import { gql } from '@apollo/client';

// Query for user authentication
export const AUTH_QUERY = gql`
  query auth {
    user {
      _id
      username
    }
  }
`;

// Mutation for creating a new story
export const CREATE_STORY = gql`
  mutation createStory($title: String!, $initialContent: String!) {
    createStory(title: $title, initialContent: $initialContent) {
      _id
      title
    }
  }
`;

// Query for fetching story contributors
export const CONTRIBUTORS_QUERY = gql`
  query contributors {
    contributors {
      _id
      name
      // You can include additional contributor details here
    }
  }
`;

// Query for fetching recent story contributions
export const CONTRIBUTIONS_QUERY = gql`
  query contributions {
    updates {
      _id
      content
      createdAt
      // Include other relevant update details
    }
  }
`;

// Add more queries related to story matchups, contributions, etc., based on your schema
