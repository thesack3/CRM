import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $color: String, $description: String) {
    addCategory(title: $title, color: $color, description: $description) {
      id
      title
      color
      description
      dateCreated
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID) {
    deleteCategory(id: $id) {
      message
    }
  }
`;
