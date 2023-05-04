import { gql } from '@apollo/client';

export const ADD_EALERT = gql`
  mutation AddEAlert($alerts: String!) {
    addEAlert(alerts: $alerts)
  }
`;

// const ADD_EALERT = gql`
//   mutation AddEAlert(
//     $contactId: String!
//     $FirstName: String!
//     $LastName: String!
//     $SearchName: String!
//     $QueryString: String!
//     $EmailFrequency: String!
//     $BuyerAgent: String!
//     $ListingAgent: String!
//     $leadId: ID!
//   ) {
//     addEAlert(
//       contactId: $contactId
//       FirstName: $FirstName
//       LastName: $LastName
//       SearchName: $SearchName
//       QueryString: $QueryString
//       EmailFrequency: $EmailFrequency
//       BuyerAgent: $BuyerAgent
//       ListingAgent: $ListingAgent
//       leadId: $leadId
//     ) {
//       id
//       contactId
//       FirstName
//       LastName
//       SearchName
//       QueryString
//       EmailFrequency
//       BuyerAgent
//       ListingAgent
//       lead {
//         id
//         # Add the fields you want to retrieve from the LeadType
//       }
//     }
//   }
// `;

// export { ADD_EALERT };
