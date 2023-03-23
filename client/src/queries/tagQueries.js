import { gql } from '@apollo/client';

const GET_TAGS = gql`
  query GetAllTags {
    tags {
      id
      title
      dateCreated
    }
  }
`;

const GET_TAG = gql`
  query GetTag($id: ID!) {
    tag(id: $id) {
      id
      title
      dateCreated
    }
  }
`;


export { GET_TAGS, GET_TAG };
