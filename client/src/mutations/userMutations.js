import {gql} from '@apollo/client';

const REGISTER_USER = gql`
mutation registerUser($email: String!, $password: String! ) {
    registerUser(email: $email, password: $password)
        {   
            id
            email
            password
        }
    }
`;

const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      id
      email
    }
  }
}
`;


const VERIFY_EMAIL = gql`
mutation verifyEmail($token: String!) {
  verifyEmail(token: $token) {
    success
    message
    user {
      id
      email
      emailVerified
    }
  }
}
`;
export {REGISTER_USER, LOGIN_USER, VERIFY_EMAIL};


