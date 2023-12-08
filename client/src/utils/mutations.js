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

// Mutation for adding a user to db
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for creating a new story
export const CREATE_STORY = gql`
  mutation createStory($title: String!, $content: String!, $genre: String!) {
    createStory(input: { title: $title, content: $content, genre: $genre }) {
      _id
      title
      content
      genre
      created_at
      author {
        _id
        username
      }
    }
  }
`;


// Mutation for updating a story
export const UPDATE_STORY = gql`
  mutation updateStory($id: ID!, $title: String, $content: String, $genre: String) {
    updateStory(id: $id, input: { title: $title, content: $content, genre: $genre }) {
      _id
      title
      content
      genre
      created_at
      author {
        _id
        username
      }
    }
  }
`;

// Mutation for deleting a story
export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id) {
      _id
      title
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

