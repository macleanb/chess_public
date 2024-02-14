/* External Imports */
import axios from 'axios';

/* Internal Imports */
import constants from '../constants';

/* Creates and returns an Axios client */
const getClient = () => {
  return axios.create({
    baseURL: constants.URL_BACKEND_BASE
  });
};

export default getClient;