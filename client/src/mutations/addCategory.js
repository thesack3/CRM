import { gql } from "@apollo/client";


const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $dateCreated: String!) {
    addCategory(title: $title, dateCreated: $dateCreated) {
      id
      title
      dateCreated
    }
  }
`;

export { ADD_CATEGORY }
