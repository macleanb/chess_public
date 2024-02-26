/* Taken from https://www.youtube.com/watch?v=Gbq66v4QulI
   Returns a dict */
const getResponseError = (error) => {
  if (error === null || error === undefined) {
      return null;
  }

  if (error.response) {
    if (error.response.status === 401) {
      const errorData = { Error: 'Invalid email or password.' };
      return errorData;
    } else if (error.response.data) {

      let responseErrors;
      if (error.response.data.errors) {
        responseErrors = error.response.data.errors;
      } else {
        responseErrors = error.response.data;
      }

      const errorData = {};
      if (responseErrors && Array.isArray(responseErrors)) {
        for (const errorItem of responseErrors) {
          errorData[errorItem.field] = errorItem.defaultMessage;
        }

        return errorData;
      } else if (responseErrors && typeof responseErrors === 'object') {
        for (const [field, messages] of Object.entries(responseErrors)) {
          errorData[field] = messages[0]; // just grabs the first message from the message array
        }

        return errorData;
      }

      return null;
    }

    return null;
  } else if (error.message) {
    const errorData = { Error: error.message };
    return errorData;
  }

  return null;
};

export default getResponseError;