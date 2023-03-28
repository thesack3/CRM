import { gql } from '@apollo/client';

const GET_LEADS = gql`
  query {
    leads {
      id
      firstName
      email
      lastName
      phone
      phoneStatus
      description
      emailInvalid
      GloballyOptedOutOfEmail
      GloballyOptedOutOfBuyerAgentEmail
      GloballyOptedOutOfListingAgentEmail
      GloballyOptedOutOfLenderEmail
      GloballyOptedOutOfAlerts
      OptInDate
      BuyerAgentCategory
      ListingAgentCategory
      LenderCategory
      BuyerAgent
      ListingAgent
      Lender
      OriginalSource
      OriginalCampaign
      LastAgentNote
      eAlerts
      VisitTotal
      listingviewcount
      AvgListingPrice
      NextCallDue
      LastAgentCallDate
      LastLenderCallDate
      FirstVisitDate
      LastVisitDate
      RegisterDate
      LeadType
      AgentSelected
      LenderOptIn
      Address
      City
      State
      ZipCode
      tags{
        id
        title
        dateCreated
      }
      categories{
        id
        title
        dateCreated
      }
      Link
      Birthday
      HomeClosingDate

      

    }
  }
`;




export const NEW_LEAD_SUBSCRIPTION = gql`
  subscription OnNewLead {
    newLead {
      id
      LastName
      FirstName
      Description
      Address
    }
  }
`;




export { GET_LEADS };
