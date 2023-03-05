import { gql } from '@apollo/client';

const GET_NOTES = gql`
  query getNotes($leadId: ID!) {
    notes(leadId: $leadId) {
      id
      contactId
      FirstName
      LastName
      Notes
      BuyerAgent
      ListingAgent
    }
  }
`;

export { GET_NOTES };
