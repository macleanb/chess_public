/**
 * Return an object with empty form data
 * for a new game
 */
export const emptyFormData_NewGame = () => {
  return {
    player1Color  :  null,
  }
};

/**
 * Returns true of form data is for New Game
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_NewGame = (formData) => {
  if (!formData || typeof formData !== 'object' || formData.constructor !== Object) {
    throw new TypeError('formData provided to formDataIs_NewGame was invalid.');
  }

  if (Object.keys(formData).length !== 1) {
    return false;
  }

  if (!formData.hasOwnProperty('player1Color')) {
    return false;
  }

  return true;
};

/**
 * Returns true of form data is for new game and empty
 * @param {Object} formData
 * @returns {boolean}
 */
export const formDataIs_NewGameEmpty = (formData) => {
  if (!formDataIs_NewGame(formData)) {
    return false;
  }

  if (!formData['player1Color'] === null) {
    return false;
  }

  return true;
}
