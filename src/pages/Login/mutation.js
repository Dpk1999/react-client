import { gql } from 'apollo-boost';

const LOGIN_USER = gql`
mutation ($email: String!, $password: String!){
  loginUser(payload: {email:$email,  password:$password}){
    message
    data{
      token
    }
  }
}
`;

export {
  LOGIN_USER,
};
