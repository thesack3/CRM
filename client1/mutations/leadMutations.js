import {gql} from '@apollo/client';

const ADD_LEAD = gql`
mutation addLead($firstName: String!, $email: String!, $phone: String!, 
    $phoneStatus: String, $emailInvalid: String, $GloballyOptedOutOfEmail: String,
     $GloballyOptedOutOfBuyerAgentEmail: String,
      $GloballyOptedOutOfListingAgentEmail: String,
       $GloballyOptedOutOfLenderEmail: String, $GloballyOptedOutOfAlerts: String,
        $OptInDate: String, $BuyerAgentCategory: String,
         $ListingAgentCategory: String, $LenderCategory: String,
          $BuyerAgent: String, $ListingAgent: String, $Lender: String, 
          $OriginalSource: String) {
      addLead(firstName: $name, email: $email, phone: $phone)
    {
      id
      name
      email
      phone
    }
  }
  `;

// const DELETE_CLIENT = gql`
// mutation deleteClient($id: ID!) {
//     deleteClient(id: $id){
//         id
//         name
//         email
//         phone
//       }
//     }
// `;

export {ADD_LEAD};