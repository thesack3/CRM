import { gql } from '@apollo/client';

const SEND_EMAILS_MUTATION = gql`
  mutation SendEmails($emails: [String!]!, $subject: String!, $body: String!) {
    sendEmails(emails: $emails, subject: $subject, body: $body) {
     
      subject
      body
    
    }
  }
`;

export { SEND_EMAILS_MUTATION};