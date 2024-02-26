/* Internal Imports */
import constants from '../constants';

/**
 * Takes in an auth object containing user information (incl.
 * permissions) and updates auth context
 * @param {Object} auth auth object to update
 * @param {Object} setAuth function to update auth context
 */
const parseAndSetAuth = (
  auth,
  setAuth
  ) => {
  if (auth?.permissions) {
    const parsedPermissions = JSON.parse(auth.permissions);
    auth.permissions = parsedPermissions;
    setAuth({
      status: constants.STATUS_AUTHENTICATED,
      user: auth.user,
      permissions: auth.permissions
    });
  } else if (auth?.user) {
    setAuth({
      status: constants.STATUS_AUTHENTICATED,
      user: auth.user
    });
  } else {
    setAuth({
      status: constants.STATUS_NOT_AUTHENTICATED
    });
  }
};

export default parseAndSetAuth;