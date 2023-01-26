import {gql} from '@apollo/client';

const GET_LEADS = gql`
query getProjects {
    projects {
        id
        name
        status
    }
}`;
const GET_LEAD = gql`
query getProjects($id: ID!) {
    project (id: $id) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
    }
}`;

export {GET_PROJECTS, GET_PROJECT};