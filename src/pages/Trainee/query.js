import { gql } from '@apollo/client';

const GET_TRAINEES = gql`
  query getAllTrainees($limit: Int, $skip: Int) {
    getAllTrainees(limit: $limit, skip: $skip) {
        message
    data{
      count
        result{
            _id
            originalId
            name
            email
            role
            password
      }
    }
    }
  }
`;

export { GET_TRAINEES };
