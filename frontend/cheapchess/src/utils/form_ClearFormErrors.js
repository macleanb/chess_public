/**
 * Removes any validation error messages from a form
 * @param {Object} parentRefs refs for all fields being cleared
 */
const clearFormErrors = (parentRefs) => {
  if (parentRefs?.inputEmailRef?.current) {
    parentRefs.inputEmailRef.current.setCustomValidity('');
  }

  if (parentRefs?.inputPasswordRef?.current) {
    parentRefs.inputPasswordRef.current.setCustomValidity('');
  }

  if (parentRefs?.inputFirstNameRef?.current) {
    parentRefs.inputFirstNameRef.current.setCustomValidity('');
  }

  if (parentRefs?.inputLastNameRef?.current) {
    parentRefs.inputLastNameRef.current.setCustomValidity('');
  }
};

export default clearFormErrors;