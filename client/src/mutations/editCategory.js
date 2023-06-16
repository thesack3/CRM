import { gql } from '@apollo/client';

export const EDIT_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $title: String, $color: String) {
    updateCategory(id: $id, title: $title, color: $color) {
      id
      title
      color
      dateCreated
    }
  }
`;
