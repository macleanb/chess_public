/* Internal Imports */
import constants from "../constants";
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getUserFormValidationErrors from "./form_getUserFormValidationErrors";

/**
 * Makes an API call to self-register a new user to the backend
 * @param {Object} auth 
 * @param {Object} formData 
 * @param {function} setMessages 
 * @returns {Object} newly registered chess user
 */
const registerUser = async (
  auth,
  formData,
  setMessages
  ) => {
  /* Don't require constants.PERMISSIONS_CAN_ADD_USER because new
     users must be able to self-register. */
  try {
    /* Perform validation */
    const validationErrors = getUserFormValidationErrors(
      formData,
      constants.FORM_MODE_USER_SELF_REGISTER
      );

    if (!validationErrors) {
      const client = getClient();
      const form_data = new FormData();

      if (formData) {
        form_data.append("email", formData.email);
        form_data.append("password", formData.password);
        form_data.append("first_name", formData.first_name);
        form_data.append("last_name", formData.last_name); 

        /* Require permissions for adding is_staff */
        // if (userData.is_staff) {
        //   if(userIsAuthorized(auth, constants.PERMISSIONS_CAN_ASSIGN_ALL_PERMISSIONS)) {
        //     form_data.append("is_staff", userData.is_staff);
        //   } else {
        //     setFrontEndErrors({'Error': 'Current user is not authorized to assign new users to "staff"'});
        //     return null;
        //   }
        // }

        form_data.append("is_active", true);

        // if (formData.image && formData.imageFileName.length > 0) {
        //   form_data.append("image", formData.image, formData.imageFileName);
        // }
      }
      
      if (client) {
        const response = await client.post(
          constants.URL_REGISTER,
          form_data,
          {
            headers: { 'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        );
        return await response?.data;
      } else {
        throw new Error('Error in apiUtils: CSRF Token null or bad Axios client.');
      }
    }
  } catch (error) {
    if (!error?.response) {
      setMessages({'Server Error': 'No Server Response'});
    } else {
      setMessages(getResponseError(error)); // requires custom User model and validators assigned to fields on the backend
    }
  }
};

export default registerUser;