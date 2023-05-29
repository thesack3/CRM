import { gql } from '@apollo/client';

// get all reminders
export const GET_TASKS = gql`
  query tasks($userId: ID) {
    tasks(userId: $userId) {
      _id
      title
      note
      date
      time
      type
      createdAt
      user {
        id
        email
      }
      lead {
        id
        firstName
        lastName
        email
      }
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

// new task type
export const TASK_TYPES = gql`
  query TaskTypes($userId: ID) {
    taskTypes(userId: $userId) {
      name
    }
  }
`;
