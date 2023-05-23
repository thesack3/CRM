import { gql } from '@apollo/client';

// get all reminders
export const GET_TASKS = gql`
  query tasks {
    tasks {
      id
      title
      note
      date
      time
      type
      createdAt
    }
  }
`;

// get single reminder
export const GET_TASK = gql`
  query task($id: ID) {
    task(id: $id) {
      id
      title
      note
      date
      time
      type
      createdAt
    }
  }
`;
