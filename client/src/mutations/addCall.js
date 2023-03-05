import { gql } from '@apollo/client';

const ADD_CALL = gql`
  mutation addCall(
    $contactId: String!
    $FirstName: String!
    $LastName: String!
    $DateCreated: String!
    $BuyerAgent: String!
    $ListingAgent: String!
    $UserID: String!
    $AssociatedopportunityID: String!
    $CallDetails: String!
    $ContactPhoneID: String!
    $LogType: String!
    $MediaURL: String!
    $CallStartTime: String!
    $CallEndTime: String!
    $leadId: ID!
  ) {
    addCall(
      contactId: $contactId
      FirstName: $FirstName
      LastName: $LastName
      DateCreated: $DateCreated
      BuyerAgent: $BuyerAgent
      ListingAgent: $ListingAgent
      UserID: $UserID
      AssociatedopportunityID: $AssociatedopportunityID
      CallDetails: $CallDetails
      ContactPhoneID: $ContactPhoneID
      LogType: $LogType
      MediaURL: $MediaURL
      CallStartTime: $CallStartTime
      CallEndTime: $CallEndTime
      leadId: $leadId
    ) {
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
      lead {
          id
      }
    }
  }
`;

export { ADD_CALL };
