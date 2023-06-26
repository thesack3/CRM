import { gql } from '@apollo/client';

export const GET_SMS_TEXT = gql`
  query Text($leadId: ID!) {
    texts(leadId: $leadId) {
      dateCreated
      body
      to
      from
      type
      createdAt
    }
  }
`;

export const GET_UNREAD_TEXT = gql`
  query UnreadTexts($userId: ID) {
    unreadTexts(userId: $userId) {
      count
      rows {
        id
        to
        from
        type
        body
        createdAt
        lead {
          email
          id
          phone
          firstName
          lastName
        }
      }
    }
  }
`;
