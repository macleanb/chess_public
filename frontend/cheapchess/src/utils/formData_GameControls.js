/**
 * Return an object with empty form data
 * for game controls
 */
export const emptyFormData_GameControls = () => {
  return {
    allPieceLocations : null
  }
};

/**
 * Returns true of form data is for Game Controls
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_GameControls = (formData) => {
  if (!formData || typeof formData !== 'object' || formData.constructor !== Object) {
    throw new TypeError('formData provided to formDataIs_GameControls was invalid.');
  }

  if (Object.keys(formData).length !== 1) {
    return false;
  }

  if (!formData.hasOwnProperty('allPieceLocations')) {
    return false;
  }

  return true;
};

/**
 * Returns true of form data is for game controls and empty
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_GameControlsEmpty = (formData) => {
  if (!formDataIs_GameControls(formData)) {
    return false;
  }

  if (!formData['allPieceLocations'] === null) {
    return false;
  }
  
  return true;
}
