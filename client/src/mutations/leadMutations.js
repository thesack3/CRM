import { gql } from '@apollo/client';

const ADD_LEAD = gql`
  mutation addLead(
    $firstName: String!
    $email: String!
    $lastName: String
    $phone: String
    $phoneStatus: String
    $description: String
    $emailInvalid: String
    $GloballyOptedOutOfEmail: String
    $GloballyOptedOutOfBuyerAgentEmail: String
    $GloballyOptedOutOfListingAgentEmail: String
    $GloballyOptedOutOfLenderEmail: String
    $GloballyOptedOutOfAlerts: String
    $OptInDate: String
    $BuyerAgentCategory: String
    $ListingAgentCategory: String
    $LenderCategory: String
    $BuyerAgent: String
    $ListingAgent: String
    $Lender: String
    $OriginalSource: String
    $OriginalCampaign: String
    $LastAgentNote: String
    $eAlerts: String
    $VisitTotal: String
    $listingviewcount: String
    $AvgListingPrice: String
    $NextCallDue: String
    $LastAgentCallDate: String
    $LastLenderCallDate: String
    $FirstVisitDate: String
    $LastVisitDate: String
    $RegisterDate: String
    $LeadType: String
    $AgentSelected: String
    $LenderOptIn: String
    $Address: String
    $City: String
    $State: String
    $ZipCode: String
    $tags: [String]
    $Link: String
    $Birthday: String
    $HomeClosingDate: String
  ) {
    addLead(
      firstName: $firstName
      email: $email
      lastName: $lastName
      phone: $phone
      phoneStatus: $phoneStatus
      description: $description
      emailInvalid: $emailInvalid
      GloballyOptedOutOfEmail: $GloballyOptedOutOfEmail
      GloballyOptedOutOfBuyerAgentEmail: $GloballyOptedOutOfBuyerAgentEmail
      GloballyOptedOutOfListingAgentEmail: $GloballyOptedOutOfListingAgentEmail
      GloballyOptedOutOfLenderEmail: $GloballyOptedOutOfLenderEmail
      GloballyOptedOutOfAlerts: $GloballyOptedOutOfAlerts
      OptInDate: $OptInDate
      BuyerAgentCategory: $BuyerAgentCategory
      ListingAgentCategory: $ListingAgentCategory
      LenderCategory: $LenderCategory
      BuyerAgent: $BuyerAgent
      ListingAgent: $ListingAgent
      Lender: $Lender
      OriginalSource: $OriginalSource
      OriginalCampaign: $OriginalCampaign
      LastAgentNote: $LastAgentNote
      eAlerts: $eAlerts
      VisitTotal: $VisitTotal
      listingviewcount: $listingviewcount
      AvgListingPrice: $AvgListingPrice
      NextCallDue: $NextCallDue
      LastAgentCallDate: $LastAgentCallDate
      LastLenderCallDate: $LastLenderCallDate
      FirstVisitDate: $FirstVisitDate
      LastVisitDate: $LastVisitDate
      RegisterDate: $RegisterDate
      LeadType: $LeadType
      AgentSelected: $AgentSelected
      LenderOptIn: $LenderOptIn
      Address: $Address
      City: $City
      State: $State
      ZipCode: $ZipCode
      tags: $tags
      Link: $Link
      Birthday: $Birthday
      HomeClosingDate: $HomeClosingDate
    ) {
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
      tags {
        id
      }
      Link
      Birthday
      HomeClosingDate
      tagsList
      categoriesList
    }
  }
`;

const updateLeadMutation = gql`
  mutation UpdateLead(
    $id: ID!
    $firstName: String
    $email: String
    $lastName: String
    $phone: String
    $tagsList: [String]
    $categoriesList: [String]
    $description: String
    $phoneStatus: String
    $emailInvalid: String
    $GloballyOptedOutOfBuyerAgentEmail: String
    $GloballyOptedOutOfListingAgentEmail: String
    $GloballyOptedOutOfLenderEmail: String
    $GloballyOptedOutOfAlerts: String
    $ListingAgent: String
    $Lender: String
    $OriginalSource: String
    $ZipCode: String
    $State: String
    $Address: String
    $Birthday: String
    $HomeClosingDate: String
    $AgentSelected: String
    $Link:String
    $LastVisitDate:String
  ) {
    updateLead(
      id: $id
      firstName: $firstName
      email: $email
      lastName: $lastName
      phone: $phone
      tagsList: $tagsList
      categoriesList: $categoriesList
      description: $description
      phoneStatus: $phoneStatus
      emailInvalid: $emailInvalid
      GloballyOptedOutOfBuyerAgentEmail: $GloballyOptedOutOfBuyerAgentEmail
      GloballyOptedOutOfListingAgentEmail: $GloballyOptedOutOfListingAgentEmail
      GloballyOptedOutOfLenderEmail: $GloballyOptedOutOfLenderEmail
      GloballyOptedOutOfAlerts: $GloballyOptedOutOfAlerts
      ListingAgent: $ListingAgent
      Lender: $Lender
      OriginalSource: $OriginalSource
      ZipCode: $ZipCode
      State: $State
      Address: $Address
      Birthday: $Birthday
      HomeClosingDate: $HomeClosingDate
      AgentSelected: $AgentSelected
      Link:$Link
      LastVisitDate:$LastVisitDate
    ) {
      id
      firstName
      email
      lastName
      phone
      tagsList
      categoriesList
      description
      phoneStatus
      emailInvalid
      AgentSelected
      updatedAt
      Link
      LastVisitDate
    }
  }
`;

const ADD_LEADS_CSV = gql`
  mutation addLeadsCsv($leads: String!) {
    addLeadsCsv(leads: $leads) {
      count
    }
  }
`;

const DELETE_LEADS = gql`
  mutation deleteLeads($ids: [ID], $deleteAll: Boolean) {
    deleteLeads(ids: $ids, deleteAll: $deleteAll) {
      message
    }
  }
`;

const FILTERS = gql`
  mutation AddFilter(
    $userId: ID!
    $columns: [String]
    $closedColumns: [String]
    $isClosed: Boolean
    $pageSize: Int
    $page: Int
    $sort: String
    $search: String
  ) {
    addFilter(
      userId: $userId
      columns: $columns
      closedColumns: $closedColumns
      isClosed: $isClosed
      pageSize: $pageSize
      page: $page
      sort: $sort
      search: $search
    ) {
      columns
      closedColumns
      isClosed
      pageSize
      page
      sort
      search
      user {
        id
        email
      }
    }
  }
`;

export { ADD_LEAD, ADD_LEADS_CSV, updateLeadMutation, DELETE_LEADS, FILTERS };
