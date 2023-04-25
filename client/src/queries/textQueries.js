import { gql } from '@apollo/client';

export const GET_SMS_TEXT = gql`
  query Text($leadId: ID!) {
    texts(leadId: $leadId) {
      dateCreated
      body
      to
      from
    }
  }
`;
