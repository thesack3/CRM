import { gql } from '@apollo/client';

const ADD_NOTE = gql`
  mutation AddNote(
    $contactId: String!,
    $FirstName: String!,
    $LastName: String!,
    $Notes: String!,
    $BuyerAgent: String!,
    $ListingAgent: String!,
    $leadId: ID!
  ) {
    addNote(
      contactId: $contactId,
      FirstName: $FirstName,
      LastName: $LastName,
      Notes: $Notes,
      BuyerAgent: $BuyerAgent,
      ListingAgent: $ListingAgent,
      leadId: $leadId
    ) {
      id
      contactId
      FirstName
      LastName
      BuyerAgent
      ListingAgent
      lead {
        id
      }
    }
  }
`;

export { ADD_NOTE };
