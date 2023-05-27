import gql from 'graphql-tag';

export const ADD_TASK = gql`
  mutation AddTASK($title: String, $note: String, $date: String, $type: String) {
    addTask(title: $title, note: $note, date: $date, type: $type) {
      title
      note
      date
      type
    }
  }
`;

// add task with lead id
export const ADD_LEAD_TASK = gql`
  mutation AddTask($title: String, $note: String, $date: String, $type: String, $userId: ID!, $leadId: ID) {
    addTask(title: $title, note: $note, date: $date, type: $type, userId: $userId, leadId: $leadId) {
      _id
      title
      note
      date
      type
      user {
        id
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

export const UPDATE_TASK = gql`
  mutation UpateTask($id: ID, $title: String, $note: String, $date: String, $type: String) {
    updateTask(id: $id, title: $title, note: $note, date: $date, type: $type) {
      _id
      title
      note
      date
      type
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID) {
    deleteTask(id: $id) {
      _id
    }
  }
`;
