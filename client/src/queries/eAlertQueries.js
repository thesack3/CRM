import { gql } from '@apollo/client';

const GET_EALERTS = gql`
  query getEAlerts($leadId: ID!) {
    ealerts(leadId: $leadId) {
      id
      contactId
      FirstName
      LastName
      SearchName
      QueryString
      EmailFrequency
      BuyerAgent
      ListingAgent
    }
  }
`;

export { GET_EALERTS };
