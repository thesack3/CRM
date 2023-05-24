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

export const UPDATE_TASK = gql`
  mutation UpateTask($id: ID, $title: String, $note: String, $date: String, $type: String) {
    updateTask(id: $id, title: $title, note: $note, date: $date, type: $type) {
      id
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
      id
    }
  }
`;
