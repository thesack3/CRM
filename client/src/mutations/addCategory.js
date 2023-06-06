import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $color: String) {
    addCategory(title: $title, color: $color) {
      id
      title
      color
      dateCreated
    }
  }
`;
