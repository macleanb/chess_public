/* Internal Imports */
import constants from '../constants';
import getClient from './api_GetClient';
import getCSRFToken from './api_GetCSRFToken';

/**
 * Log a user out from the backend server
 * @param {function} setAuth sets authentication context
 * @returns {boolean} true of successful, false otherwise
 */
const signOut = async (setAuth) => {
  const client = getClient();

  if (client && setAuth) {
    try{
      const csrfToken = getCSRFToken();

      // Provide cookie to post
      client.post(
        constants.URL_LOGOUT,
        {PlaceholderData: ''},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken
          },
          withCredentials: true
        }
      ).then( (result) => {
        setAuth(null);
        
        // Erase the CSRF Token from cookies
        document.cookie = 'csrftoken=; Max-Age=-99999999;';

        return true;
      });
    } catch (e) {
      console.log(`Error in Logout.js.  ${e}`)
      return false;
    }
  }
};

export default signOut;