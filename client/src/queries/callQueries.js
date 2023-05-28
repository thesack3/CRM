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

// voice call query

const GET_VOICE_CALLS = gql`
  query VoiceCallList($leadId: ID) {
    voiceCallList(leadId: $leadId) {
      id
      createdAt
    }
  }
`;

export { GET_CALLS, GET_VOICE_CALLS };
