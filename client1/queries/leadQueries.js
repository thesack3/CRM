import {gql} from '@apollo/client';

const GET_LEADS = gql`
query getClients {
    leads{
        id
       firstName
       email
        
    }
}`;
// const GET_LEAD = gql`
// query getLead($id: ID!) {
//     lead (id: $id) {
//         id
//         name
//         description
//         status
//         client {
//             id
//             name
//             email
//             phone
//         }
//     }
// }`;

export {GET_LEADS};