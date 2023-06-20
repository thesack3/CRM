import { gql } from '@apollo/client';

const SEND_EMAILS = gql`
  mutation SendEmails($ids: [ID], $subject: String!, $body: String!) {
    sendEmails(ids: $ids, subject: $subject, body: $body) {
      subject
      body
    }
  }
`;

const SEND_EMAIL = gql`
  mutation sendEmailToLead($leadId: ID, $subject: String, $body: String) {
    sendEmailToLead(leadId: $leadId, subject: $subject, body: $body) {
      message
    }
  }
`;

export { SEND_EMAILS, SEND_EMAIL };
