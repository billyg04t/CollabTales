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

// Query for fetching a specific story
export const GET_STORY = gql`
  query getStory($id: ID!) {
    story(id: $id) {
      _id
      title
      content
    }
  }
`;

// Query for fetching story contributors
export const CONTRIBUTORS_QUERY = gql`
  query contributors {
    contributors {
      _id
      name
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
    }
  }
`;

// Export for finding liked stories
export const LIKEDSTORIES_QUERY = gql`
  query likedStories($userId: ID!) {
    likedStories(userId: $userId) {
      _id
      title
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      stories {
        _id
        storyText
      }
    }
  }
`;