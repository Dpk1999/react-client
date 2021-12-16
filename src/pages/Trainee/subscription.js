import { gql } from '@apollo/client';

const UPDATE_TRAINEE_SUB = gql`
subscription{
    userUpdated{
       _id 
      originalId
      name 
      email 
      role
      createdAt
      password
    }
  }
`;

const DELETE_TRAINEE_SUB = gql`
subscription{
    userDeleted{
          message
      status
      id
    }
  }
`;

export { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
