import { gql } from '@apollo/client';

const NOTES = gql`
  query notes($leadId: ID!) {
    notes(leadId: $leadId) {
      id
      contactId
      FirstName
      LastName
      Notes
      BuyerAgent
      ListingAgent
      lead {
        id
        firstName
      }
    }
  }
`;

export { NOTES };
