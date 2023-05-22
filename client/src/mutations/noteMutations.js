import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation AddNote($notes: String!) {
    addNote(notes: $notes)
  }
`;
