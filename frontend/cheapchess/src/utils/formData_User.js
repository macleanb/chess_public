/**
 * Return an object with empty form data
 * for a user
 */
export const emptyFormData_User = () => {
  return {
    email        :  '',
    password     :  '',
    first_name   :  '',
    last_name    :  '',
  }
};

/**
 * Returns true of form data is for a user
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_User = (formData) => {
  if (!formData || typeof formData !== 'object' || formData.constructor !== Object) {
    throw new TypeError('formData provided to formDataIs_User was invalid.');
  }

  if (Object.keys(formData).length !== 4) {
    return false;
  }

  if (!formData.hasOwnProperty('email')) {
    return false;
  }

  if (!formData.hasOwnProperty('password')) {
    return false;
  }

  if (!formData.hasOwnProperty('first_name')) {
    return false;
  }

  if (!formData.hasOwnProperty('last_name')) {
    return false;
  }

  return true;
};

/**
 * Returns true of form data is for user and empty
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_UserEmpty = (formData) => {
  if (!formDataIs_User(formData)) {
    return false;
  }

  if (!formData['email'] === '') {
    return false;
  }

  if (!formData['password'] === '') {
    return false;
  }

  if (!formData['first_name'] === '') {
    return false;
  }

  if (!formData['last_name'] === '') {
    return false;
  }

  return true;
}