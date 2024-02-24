/* Internal Imports */
import constants from '../constants';

/**
 *  Validates user data from UserForm
 * @param {Object} formData
 * @returns {Object}
 * */ 
const getUserFormValidationErrors = (
  formData,
  formMode
  ) =>
{
  let result = null;
  const reEmail = /^[\w\.@]{8,150}$/;
  const rePassword = /^.{8,150}$/;
  const reFirstName = /^[A-Za-z- ]{1,150}$/;
  const reLastName = /^[A-Za-z- ]{1,150}$/;

  if (!formData) {
    result = { general: `Error: user data is invalid.` };
  } else if (!reEmail.test(formData.email)) {
    result = { email: 'E-mail is missing or improperly formatted (must be between 8 and 150 characters).' }
  } else if (formData.password && formData.password.length > 0 && !rePassword.test(formData.password)) {
    result = { password: 'Password is missing or improperly formatted (must be between 8 and 150 characters).' };
  } else if (formMode === constants.FORM_MODE_USER_SELF_REGISTER && !reFirstName.test(formData.first_name)) {
    result = { first_name: 'First name is missing or improperly formatted (must be between 1 and 150 alphabetical characters).' };
  } else if (formMode === constants.FORM_MODE_USER_SELF_REGISTER && !reLastName.test(formData.last_name)) {
    result = { last_name: 'Last name is missing or improperly formatted (must be between 1 and 150 alphabetical characters).' };
  }

  return result;
}

export default getUserFormValidationErrors;