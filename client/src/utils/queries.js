import { gql } from '@apollo/client';

// Query for user authentication
export const AUTH_QUERY = gql`
query {
  getUser {
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
      genre
      created_at
      author {
        _id
        username
      }
    }
  }
`;

export const GET_RECENT_STORIES = gql`
query getRecentStories {
  recentStories {
    _id
    title
    author {
      username
    }
    created_at
  }
}
`;

// Query for fetching stories by genre
export const GET_STORIES_BY_GENRE = gql`
  query getStoriesByGenre($genre: String!) {
    storiesByGenre(genre: $genre) {
      _id
      title
      content
      created_at
      author {
        _id
        username
      }
    }
  }
`;

// Query for fetching a specific contribution
export const GET_CONTRIBUTION = gql`
  query getContribution($id: ID!) {
    contribution(id: $id) {
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

// Query for fetching recent story contributions
 // Query for fetching recent story contributions
export const CONTRIBUTIONS_QUERY = gql`
query getRecentContributions {
  recentContributions {
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
// // Query for fetching recent story contributions
// export const CONTRIBUTIONS_QUERY = gql`
//   query getRecentContributions {
//     recentContributions {
//       _id
//       user {
//         _id
//         username
//       }
//       title
//       content
//       created_at
//     }
//   }
// `;


// Query for fetching contributions by user
export const GET_CONTRIBUTIONS_BY_USER = gql`
  query getContributionsByUser($userId: ID!) {
    contributionsByUser(userId: $userId) {
      _id
      title
      content
      created_at
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