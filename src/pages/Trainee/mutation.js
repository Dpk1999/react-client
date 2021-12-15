import { gql } from '@apollo/client';

const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $role: String!, $password: String!) {
  createUser (user: {name: $name, email: $email, role: $role, password: $password}) {
      _id
      name
      email
      role
      password
      createdAt
      originalId
  }
}
`;
const UPDATE_USER = gql`
mutation updateUser($originalId: String!, $name: String!, $email: String!) {
  updateUser (user: {originalId: $originalId, name: $name, email: $email}) {
      _id
      name
      email
      role
      password
      createdAt
      originalId
  }
}
`;
const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
  deleteUser (id: $id) {
    message
    status
    id
  }
}
`;

export { CREATE_USER, UPDATE_USER, DELETE_USER };
