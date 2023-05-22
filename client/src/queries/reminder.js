import { gql } from '@apollo/client';

// get all reminders
export const GET_REMINDERS = gql`
  query reminders {
    reminders {
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
export const GET_REMINDER = gql`
  query reminders($id: ID) {
    reminder(id: $id) {
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
