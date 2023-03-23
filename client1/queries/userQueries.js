import {gql} from '@apollo/client';

const GET_USERS = gql`
query getUsers {
    users {
        id
        email
        password
    }
}`;


export {GET_USERS};