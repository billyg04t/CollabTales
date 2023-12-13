import { gql } from '@apollo/client';

// Mutation for adding a contribution to the story
export const ADD_CONTRIBUTION = gql`
mutation AddContribution($userId: ID!, $storyId: ID!, $title: String!, $content: String!) {
  addContribution(userId: $userId, storyId: $storyId, title: $title, content: $content) {
    _id
    user {
      _id
      username
    }
    title
    content
    created_at
  }
}
`;

// Mutation for updating a contribution
export const UPDATE_CONTRIBUTION = gql`
  mutation updateContribution($id: ID!, $content: String!) {
    updateContribution(id: $id, input: { content: $content }) {
      _id
      user {
        _id
        username
      }
      title
      content
      created_at
    }
  }
`;
// Mutation for deleting a contribution
export const DELETE_CONTRIBUTION = gql`
  mutation deleteContribution($id: ID!) {
    deleteContribution(id: $id) {
      _id
      user {
        _id
        username
      }
      title
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
export const ADD_STORY = gql`
mutation AddStory($title: String!, $content: String!, $genre: String!) {
  addStory(title: $title, content: $content, genre: $genre) {
    _id
    title
    content
    genre
    created_at
    author {
      _id
      username
      __typename
    }
    __typename
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
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`;