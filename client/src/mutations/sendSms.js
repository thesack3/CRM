import { gql } from '@apollo/client';

// Define mutation
export const SEND_SMS = gql`
  mutation SendSMS($toNumber: String!, $msg: String!, $leadId: ID!) {
    sendSMS(toNumber: $toNumber, msg: $msg, leadId: $leadId) {
      accountSid
      body
      to
      from
      dateCreated
    }
  }
`;
