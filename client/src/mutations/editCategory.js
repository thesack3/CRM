import { gql } from '@apollo/client';

export const EDIT_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $title: String, $color: String, $description: String) {
    updateCategory(id: $id, title: $title, color: $color, description: $description) {
      id
      title
      color
      description
      dateCreated
    }
  }
`;
