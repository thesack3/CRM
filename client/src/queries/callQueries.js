import { gql } from '@apollo/client';

const GET_CALLS = gql`
  query getCalls($leadId: ID!) {
    calls(leadId: $leadId) {
      id
      contactId
      FirstName
      LastName
      DateCreated
      BuyerAgent
      ListingAgent
      UserID
      AssociatedopportunityID
      CallDetails
      ContactPhoneID
      LogType
      MediaURL
      CallStartTime
      CallEndTime
    }
  }
`;

export { GET_CALLS };
