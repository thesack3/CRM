import { gql } from '@apollo/client';

// Define mutation
export const SEND_CALL = gql`
  mutation SendCall($toNumber: String!, $msg: String, $leadId: ID!) {
    sendCall(toNumber: $toNumber, msg: $msg, leadId: $leadId) {
      accountSid
      to
      from
      body
      status
    }
  }
`;
