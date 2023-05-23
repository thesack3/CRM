import gql from "graphql-tag";

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
