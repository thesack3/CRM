import gql from "graphql-tag";

export const ADD_REMINDER = gql`
  mutation AddReminder($title: String, $note: String, $date: String, $type: String) {
    addReminder(title: $title, note: $note, date: $date, type: $type) {
      title
      note
      date
      type
    }
  }
`;
