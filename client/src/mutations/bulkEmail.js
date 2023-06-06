import { gql } from '@apollo/client';

const SEND_EMAILS_MUTATION = gql`
  mutation SendEmails($emails: [String!]!, $subject: String!, $body: String!) {
    sendEmails(emails: $emails, subject: $subject, body: $body) {
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

export { SEND_EMAILS_MUTATION, SEND_EMAIL };
