/* Internal Imports */
import constants from '../constants';
import getUserFormValidationErrors from './form_getUserFormValidationErrors';

/**
 * Reports whether formData is valid, and returns
 * a boolean indicating the validity.
 * @param {*} formData a dict containing the submitted form data
 * @param {*} elementRefs a ref object containing references to DOM elements
 * @returns {boolean} true if data is valid, false otherwise
 */
const reportUserFormValidity = (
  formData,
  elementRefs,
  formMode
  ) =>
{
  let customValidity = true;

  /* Check for custom validation errors and report as needed. */
  if (formData && elementRefs) {
    const customValidationErrors = getUserFormValidationErrors(
      formData,
      formMode
      );

    if (customValidationErrors?.email) {
      customValidity = false;
    } else if (customValidationErrors?.password) {
      customValidity = false;
    } else if (customValidationErrors?.first_name) {
      customValidity = false;
    } else if (customValidationErrors?.last_name) {
      customValidity = false;
    }  else if (customValidationErrors?.general) {
      customValidity = false;
    }

    /* Set all custom validities to either the error string or empty string */
    elementRefs.inputEmailRef.current.setCustomValidity(
      customValidationErrors?.email ? customValidationErrors.email : 
        customValidationErrors?.general ? customValidationErrors.general : ''
    );

    elementRefs.inputPasswordRef.current.setCustomValidity(
      customValidationErrors?.password ? customValidationErrors.password : ''
    );

    if (formMode === constants.FORM_MODE_USER_SELF_REGISTER) {
      elementRefs.inputFirstNameRef.current.setCustomValidity(
        customValidationErrors?.first_name ? customValidationErrors.first_name : ''
      );
  
      elementRefs.inputLastNameRef.current.setCustomValidity(
        customValidationErrors?.last_name ? customValidationErrors.last_name : ''
      );
    }
  }

  /* If no custom errors were found, form could still be invalid based on
     built-in validation. */
  const form = document.getElementById("user-form");
  const builtInValidity = form.reportValidity();

  return customValidity && builtInValidity;
}

export default reportUserFormValidity;