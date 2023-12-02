
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

// Query for fetching story contributors
export const CONTRIBUTORS_QUERY = gql`
  query contributors {
    contributors {
      _id
      name
    }
  }
`;

// Query for fetching recent story updates
export const CONTRIBUTIONS_QUERY = gql`
  query contributions {
    contributions {
      _id
      content
      createdAt
    }
  }
`;

// Add more queries related to story matchups, contributions, etc., based on your schema
