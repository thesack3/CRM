import { gql } from "@apollo/client";


const ADD_TAG = gql`
  mutation AddTag($title: String!, $dateCreated: String!) {
    addTag(title: $title, dateCreated: $dateCreated) {
      id
      title
      dateCreated
    }
  }
`;

export { ADD_TAG }
