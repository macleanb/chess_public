/* Internal Imports */
import constants from '../constants';
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getUserFormValidationErrors from './form_getUserFormValidationErrors';

/**
 * Logs a user in with formData credentials
 * 
 * @param {Object} formData
 * @param {function} setMessages 
 * @returns {Object} authenticated user data
 */
const signIn = async (
  formData,
  setMessages
  ) =>
{
  let response = null;

  try {
    /* Perform validation */
    const validationErrors = getUserFormValidationErrors(
      formData,
      constants.FORM_MODE_USER_SIGNIN
      );

    if (!validationErrors) {
      response = await getClient().post(
        constants.URL_LOGIN, 
        JSON.stringify(formData), 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
    }

  } catch (error) {
    if (!error?.response) {
      setMessages({'Server Error': 'No Server Response'});
    } else {
      setMessages(getResponseError(error)); // requires custom User model and validators assigned to fields on the backend
    }
  }

  return response;
};

export default signIn;