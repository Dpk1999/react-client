import axios from 'axios';

// export const callApi = async (api, email, password) => {
//   let response;
//   const data = {
//     email,
//     password,
//   };
//   try {
//     const res = await axios.post(api, data);
//     response = res.data;
//     console.log('response', response);
//   } catch (error) {
//     console.log(error.response);
//     console.log('response when got error', error);
//   }
//   return response;
// };

const URL_BACKEND = 'http://localhost:8080/api';
export const callAllApi = async (ENDPOINT, METHOD, DATA) => {
  let response = '';
  const options = {
    url: `${URL_BACKEND}${ENDPOINT}`,
    method: METHOD,
    data: DATA,
  };
  try {
    response = await axios(options);
  } catch (e) {
    console.log(e);
  }
  return response;
};
