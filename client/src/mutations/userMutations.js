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


export {REGISTER_USER};


