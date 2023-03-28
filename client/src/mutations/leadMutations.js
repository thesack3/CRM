import { gql } from '@apollo/client';

const ADD_LEAD = gql`
  mutation addLead(
    $firstName: String!,
    $email: String!,
    $lastName: String,
    $phone: String,
    $phoneStatus: String,
    $description: String,
    $emailInvalid: String,
    $GloballyOptedOutOfEmail: String,
    $GloballyOptedOutOfBuyerAgentEmail: String,
    $GloballyOptedOutOfListingAgentEmail: String,
    $GloballyOptedOutOfLenderEmail: String,
    $GloballyOptedOutOfAlerts: String,
    $OptInDate: String,
    $BuyerAgentCategory: String,
    $ListingAgentCategory: String,
    $LenderCategory: String,
    $BuyerAgent: String,
    $ListingAgent: String,
    $Lender: String,
    $OriginalSource: String,
    $OriginalCampaign: String,
    $LastAgentNote: String,
    $eAlerts: String,
    $VisitTotal: String,
    $listingviewcount: String,
    $AvgListingPrice: String,
    $NextCallDue: String,
    $LastAgentCallDate: String,
    $LastLenderCallDate: String,
    $FirstVisitDate: String,
    $LastVisitDate: String,
    $RegisterDate: String,
    $LeadType: String,
    $AgentSelected: String,
    $LenderOptIn: String,
    $Address: String,
    $City: String,
    $State: String,
    $ZipCode: String,
    $tags: [String]
    $Link: String,
    $Birthday: String,
    $HomeClosingDate: String
  ) {
    addLead(
      firstName: $firstName,
      email: $email,
      lastName: $lastName,
      phone: $phone,
      phoneStatus: $phoneStatus,
      description: $description,
      emailInvalid: $emailInvalid,
      GloballyOptedOutOfEmail: $GloballyOptedOutOfEmail,
      GloballyOptedOutOfBuyerAgentEmail: $GloballyOptedOutOfBuyerAgentEmail,
      GloballyOptedOutOfListingAgentEmail: $GloballyOptedOutOfListingAgentEmail,
      GloballyOptedOutOfLenderEmail: $GloballyOptedOutOfLenderEmail,
      GloballyOptedOutOfAlerts: $GloballyOptedOutOfAlerts,
      OptInDate: $OptInDate,
      BuyerAgentCategory: $BuyerAgentCategory,
      ListingAgentCategory: $ListingAgentCategory,
      LenderCategory: $LenderCategory,
      BuyerAgent: $BuyerAgent,
      ListingAgent: $ListingAgent,
      Lender: $Lender,
      OriginalSource: $OriginalSource,
      OriginalCampaign: $OriginalCampaign,
      LastAgentNote: $LastAgentNote,
      eAlerts: $eAlerts,
      VisitTotal: $VisitTotal,
      listingviewcount: $listingviewcount,
      AvgListingPrice: $AvgListingPrice,
      NextCallDue: $NextCallDue,
      LastAgentCallDate: $LastAgentCallDate,
      LastLenderCallDate: $LastLenderCallDate,
      FirstVisitDate: $FirstVisitDate,
      LastVisitDate: $LastVisitDate,
      RegisterDate: $RegisterDate,
      LeadType: $LeadType,
      AgentSelected: $Agent,
LenderOptIn: $LenderOptIn,
Address: $Address,
City: $City,
State: $State,
ZipCode: $ZipCode,
tags: $tags,
Link: $Link,
Birthday: $Birthday,
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
tags
Link
Birthday
HomeClosingDate
}
}
`;

const updateLeadMutation = gql`
  mutation UpdateLead(
    $id: ID!,
    $firstName: String,
    $email: String,
    $lastName: String,
    $tags: [String],
    $categories: [String]
   
  ) {
    updateLead(
      id: $id,
      firstName: $firstName,
      email: $email,
      lastName: $lastName,
      tags: $tags,
      categories: $categories,
 
    ) {
      id
      firstName
      email
      lastName
      tags{
        id
      }
      categories{
        id
      }
    
      
    }
  }
`;


export { ADD_LEAD, updateLeadMutation };
