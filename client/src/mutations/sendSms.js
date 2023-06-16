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

// write schmea for updateTextIsRead

export const UPDATE_TEXT_IS_READ = gql`
  mutation UpdateTextIsRead($leadId: ID) {
    updateTextIsRead(leadId: $leadId) {
      to
      from
    }
  }
`;

export const SEND_MESSAGE_TO_LEADS = gql`
  mutation SendSMSToLeads($leadIds: [ID], $msg: String) {
    sendSMSToLeads(leadIds: $leadIds, msg: $msg) {
      id
      to
      from
    }
  }
`;
