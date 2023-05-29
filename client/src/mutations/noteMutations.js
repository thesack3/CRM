import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation AddNote($notes: String!) {
    addNote(notes: $notes)
  }
`;

export const ADD_SINGLE_NOTE = gql`
  mutation AddSingleNote(
    $contactId: String
    $firstName: String
    $lastName: String
    $notes: String
    $buyerAgent: String
    $listingAgent: String
    $leadId: ID
  ) {
    addSingleNote(
      contactId: $contactId
      firstName: $firstName
      lastName: $lastName
      notes: $notes
      buyerAgent: $buyerAgent
      listingAgent: $listingAgent
      leadId: $leadId
    ) {
      id
      FirstName
    }
  }
`;
