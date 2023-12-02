import { gql } from '@apollo/client';

// Mutation for adding a contribution to the story
export const ADD_CONTRIBUTION = gql`
  mutation addContribution($_id: String!, $content: String!) {
    addContribution(_id: $_id, content: $content) {
      _id
      content
      createdAt
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

// Add more mutations as needed for your story assignment
