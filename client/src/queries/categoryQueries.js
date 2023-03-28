import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      id
      title
      dateCreated
    }
  }
`;

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      title
      dateCreated
    }
  }
`;


export { GET_CATEGORIES, GET_CATEGORY };
