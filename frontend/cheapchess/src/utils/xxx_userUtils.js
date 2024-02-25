////////////////
///  Imports ///
////////////////

/* External Libraries */
import axios from 'axios';

/* Internal Libraries */
import { getMailingAddressForUser } from './addressUtils';
import { getCSRFToken, getClient } from './apiUtils';
import { userIsAuthorized } from './authUtils';
import constants from '../constants';
import { getResponseError } from './errorUtils';
import { getResidencesForUser } from './residenceUtils';
import getURL_UserForResidence from './getURL_UserForResidence';
import indexOfObj from './indexOfObj';


/////////////////////////////////
/// Internal Helper Functions ///
/////////////////////////////////

/* Returns a url to fetch data for a specific user */
const getUserURL = (userID) => {
  let result = null;
  if (userID) {
    result = constants.USERS_URL;
    result += userID + '/';
  }
  return result;
}

/* Creates a URL to fetch all users who own a specific residence */
const getUsersForResidenceURL = (residenceID) => {
  let result = null;
  if (residenceID) {
    result = constants.RESIDENCES_URL;
    result += residenceID + '/users/';
  }
  return result;
}


///////////////////////////////
/// Export Helper Functions ///
///////////////////////////////

/* Returns a dict with empty login data */
export const emptyLoginData = () => {
  return {
    email: '',
    password: ''
  }
}

/* Returns a dict with empty user data */
export const emptyUserData = () => {
  return {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_active: true,
    fk_mailing_address: null,
    image: null,
    imageFileName: '',
    deleteExistingImage: false,
    backendImageExists: false,
    residences: null,
  }
}

/* Returns an array of filtered users.
   Parameters:
    usersArray: array of users (each element is a dict)
    possibleAddressesDict: dict of address dicts, keyed by address_id
    residencesArray: array of residences (each element is a dict)
    search_term: string, MUST be upper case in order to work. */
export const filterUsers = (
  allOwnersResidencesDict,
  usersArray,
  possibleAddressesDict,
  residencesDict,
  search_term
  ) => 
{
  let result = usersArray;

  /* Only filter if there are users and a search term, otherwise
    just return the users that were passed in */
  if (usersArray && search_term) {
      result = usersArray.filter( (user_obj) => {
          const re = new RegExp(search_term, "g");
  
          /* First see if the search term matches any user data */
          if (re.test(user_obj.first_name.toUpperCase()) || re.test(user_obj.last_name.toUpperCase()) || re.test(user_obj.email.toUpperCase())) {
            return true;
          /* If no user data was matched, see if the user's mailing address or
              any user residences match the search term. */
          } else {
            /* Build an array of all addresses to check for matches with the search term.
                Start with the users's mailing address, if they have one. */
            const addressesToCheck = getMailingAddressForUser(user_obj, possibleAddressesDict);
  
            /* Next, filter all the residences owned by user_obj and add
              those addresses to the search array as well */
            if (residencesDict && possibleAddressesDict && allOwnersResidencesDict){
              /* Build an array of all users to check for matches with the search term */
              let residenceIDsToCheck = allOwnersResidencesDict[user_obj.id.toString()];

              /* Sometimes residenceIDsToCheck could be undefined if there aren't any residence-owner
                 relationships for some users */
              if (residenceIDsToCheck && residenceIDsToCheck.length > 0) {
                for (const residenceIDToCheck of residenceIDsToCheck) {
                  const addrID = residencesDict[residenceIDToCheck].addrID;
                  addressesToCheck.push(possibleAddressesDict[addrID.toString()]);
                }
              }
            }
        
            /* Now iterate through addresses to check as long as length > 0,
                looking for search term matches inside each address */
            if (addressesToCheck.length > 0) {
              for (const address_dict of addressesToCheck) {
                if (re.test(address_dict['street'].toUpperCase())) {
                  return true;
                // street_2 field may be null, so make sure it isn't before you convert to uppercase
                } else if (address_dict['street_2'] && re.test(address_dict['street_2'].toUpperCase())) {
                  return true;
                } else if (re.test(address_dict['city'].toUpperCase())) {
                  return true;
                } else if (re.test(address_dict['addr_state'].toUpperCase())) {
                  return true;
                } else if (re.test(address_dict['zipcode'])) {
                  return true;
                }
              }
            }
          }
          return false;
      });
  }

  return result;
}

/* Validates credentials data from Login form */
export const getLoginValidationErrors = (loginData) => {
  let result = null;

  if (!loginData) {
    result = { general: `Error: login data is invalid.` };
  } else if (loginData.email === '') {
    result = { email: `missing email` };
  } else if (loginData.password === '') {
    result = { password: `missing password` };
  }

  return result;
}

/* Returns a user index from the allUserData array, if one
   has the ID that was passed in. Otherwise returns null.
   Parameters:
     userID: number 
     allUserData: array (with id field as number)
   Returns: user index (number) or null */
export const getUserIndexFromAllUserDataArray = (userID, allUserData) => {
  if (userID && allUserData) {
    for (const i in allUserData) {
      
      /* See if the ID of the current user object matches the userID that
          was passed in. */
      const user_obj = allUserData[i];

      if (userID === user_obj.id) {
        return i;
      }
    }
  }

  return null;
}

/* Removes a user object from an array of users.
   Inputs:
     userID: integer
     arr: array of user dicts
    Output: either null or a new array minus the removed user
*/
// export const removeUserFromArray = (userID, arr) => {
//   let result = null;
//   if (userID && arr && Array.isArray(arr)) {
//     result = [];
    
//     for (const user of arr) {
//       if (user.id !== userID) {
//         result.push({...user});
//       }
//     }
//   }
//   return result;
// }

/* Determines whether a user object already exists in an array
   Inputs: 
      arr: an array of user dicts containing id fields (integers)
      userID: an integer representing a user ID
    Outputs:
      boolean
*/
// export const userArrayHasUserID = (arr, userID) => {
//   if (Array.isArray(arr) && Number.isInteger(userID)) {
//     for (const elem of arr) {
//       if (elem?.id) {
//         if (elem.id === userID) {
//           return true;
//         }
//       }
//     }
//   }

//  return false;
// }




////////////////////////////////////
///  API Calls - Authentication  ///
////////////////////////////////////

/* Logs a user in with loginData credentials */
export const loginUser = async (loginData) => {
  const response = await getClient().post(
    constants.LOGIN_URL, 
    JSON.stringify(loginData), 
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  );

  return await response;
}


//////////////////////////
///  API Calls - CRUD  ///
//////////////////////////

/* Makes an API call to add a new user to the backend */
export const addUser = async (auth, userData, setFrontEndErrors, setBackEndErrors, setSuccessMessages) => {
  /* TODO require constants.PERMISSIONS_CAN_ADD_USER */
  try {
    /* Handle any blank fields on the 
    front end rather than sending blank credentials to the server */
    const validationErrors = getUserValidationErrors(userData);

    if (!validationErrors) {
      const csrfToken = getCSRFToken();
      const client = getClient();
      const form_data = new FormData();

      if (userData) {
        form_data.append("email", userData.email);
        form_data.append("password", userData.password);
        form_data.append("first_name", userData.first_name);
        form_data.append("last_name", userData.last_name); 

        /* Require permissions for adding is_staff */
        if (userData.is_staff) {
          if(userIsAuthorized(auth, constants.PERMISSIONS_CAN_ASSIGN_ALL_PERMISSIONS)) {
            form_data.append("is_staff", userData.is_staff);
          } else {
            setFrontEndErrors({'Error': 'Current user is not authorized to assign new users to "staff"'});
            return null;
          }
        }

        if (userData.is_active) {
          form_data.append("is_active", userData.is_active);
        }

        if (userData.fk_mailing_address) {
          form_data.append("fk_mailing_address", userData.fk_mailing_address);
        }

        if (userData.image && userData.imageFileName.length > 0) {
          form_data.append("image", userData.image, userData.imageFileName);
        }
      }
      
      if (csrfToken && client) {
        const response = await client.post(
          constants.USERS_URL,
          form_data,
          {
            headers: { 'Content-Type': 'multipart/form-data',
                        "X-CSRFToken": csrfToken
            },
            withCredentials: true
          }
        );
        
        if (await response?.data) {
          /* Now add any residences */

          let residencesAdded = false;
          let backendErrorsExist = false;

          if (userData.residences) {
            const userID = response.data.id;

            for (const residence of userData.residences) {
              const HOAUserResidenceFormData = new FormData();
              HOAUserResidenceFormData.append('fk_HOAUser', userID);
              HOAUserResidenceFormData.append('fk_Residence', residence.id);

              try {
                const addResidenceResponse = await client.post(
                  getUsersForResidenceURL(residence.id),
                  HOAUserResidenceFormData,
                  {
                    headers: { 'Content-Type': 'multipart/form-data',
                              "X-CSRFToken": csrfToken
                    },
                    withCredentials: true
                  }

                );

                if (await addResidenceResponse?.data) {
                  residencesAdded = true;
                }
              } catch (e) {
                backendErrorsExist = true;

                // test
                console.log(e);
              }
            }
          }
          if (!backendErrorsExist) {
            setSuccessMessages({'Success': `User added successfully${ residencesAdded ? ' (along with residences)' : '' }.`});
          } else {
            setBackEndErrors({Error: 'User created successfully, but at least one residence could not be added.'});
          }
        }

        return await response?.data;
      } else {
        throw new Error('Error in apiUtils: CSRF Token null or bad Axios client.');
      }
    }  else {
      // Rely on built-in reportValidity() call in handleClick function
      // setFrontEndErrors(validationErrors);
    }
  } catch (error) {
    if (!error?.response) {
      setBackEndErrors({'Server Error': 'No Server Response'});
    } else {
      setBackEndErrors(getResponseError(error)); // new way that requires custom User model and validators assigned to fields on the backend
    }
  }
}

/* Gets all users from backend as array */
export const getAllUsersAsArray = async (auth) => {
  if (userIsAuthorized(auth, constants.PERMISSIONS_CAN_VIEW_ALL_USERS)) {
      try {
          const response = await axios.get(constants.USERS_URL);
          return await response?.data;
      } catch (e) {
          console.log(e);
      }
  }
}

/* Gets all users from backend as dict */
export const getAllUsersAsDict = async (auth) => {
let result = {};

if (userIsAuthorized(auth, constants.PERMISSIONS_CAN_VIEW_ALL_USERS)) {

    try {
        const response = await axios.get(constants.USERS_URL);
        const data = await response?.data;

        if (data) {
          const updated_users = {}
          for (const user of data) {
              if (user) {
                const user_id = user['id'];
                updated_users[user_id] = user;
              }
          }
          result = updated_users;
        }
    } catch (e) {
        console.log(e);
    }
}
return result;
}

/* Retrieves a single address from the backend server */
export const getUserByID = async (auth, userID, setBackEndErrors) => {
if ( userIsAuthorized(auth, constants.PERMISSIONS_CAN_VIEW_ALL_USERS) || 
   ( userIsAuthorized(auth, constants.PERMISSIONS_CAN_VIEW_USER) && auth.user.id === userID)) {
  try {
      const userURL = getUserURL(userID);
      const response = await axios.get(userURL);
      return await response?.data;

  } catch (e) {
      console.log(e);
      setBackEndErrors(e);
  }
}
}

/* Send user patch request after verifying permissions and validating data */
export const updateUser = async (
  auth,
  userIDToUpdate,
  userData,
  setFrontEndErrors,
  setBackEndErrors,
  setSuccessMessages
  ) => 
{  
  if (userIsAuthorized(auth, constants.PERMISSIONS_CAN_UPDATE_ALL_USERS) || 
  ( userIsAuthorized(auth, constants.PERMISSIONS_CAN_UPDATE_USER) && auth.user.id === userIDToUpdate)) {
    try {
      /* Handle any blank fields on frontend rather than sending blank credentials to the server */
      const validationErrors = getUserValidationErrors(userData);
      
      if (!validationErrors) {
        const csrfToken = getCSRFToken();
        const client = getClient();
        const form_data = new FormData();

        if (userData) {
          form_data.append("email", userData.email);
          form_data.append("first_name", userData.first_name);
          form_data.append("last_name", userData.last_name);

          if (userData.is_active) {
            form_data.append("is_active", userData.is_active);
          }

          if (userData.is_staff) {
            form_data.append("is_staff", userData.is_staff);
          }

          if (userData.fk_mailing_address) {
            form_data.append("fk_mailing_address", userData.fk_mailing_address);
          }

          if (userData.image && userData.imageFileName.length > 0 ) { // if it isn't null, it should be a file
            form_data.append("image", userData.image, userData.imageFileName);
          } else if (userData.deleteExistingImage) { // append the null value (null not accepted, but '' is)
            form_data.append("image", '');
          }

          if (userData.password && userData.password.length > 0) {
            form_data.append("password", userData.password);
          }
        }
        
        if (csrfToken && client) {
          const response = await client.patch(
            getUserURL(userIDToUpdate),
            form_data,
            {
              headers: { 'Content-Type': 'multipart/form-data',
                        "X-CSRFToken": csrfToken
              },
              withCredentials: true
            }
          );
          
          if (await response?.data) {
            /* Now update any residences */
            const userID = response.data.user.id;  
            let residencesUpdated = false;

            /* Don't add residences in userData that are already present in currentResidences on backend.
               Also, if an residence is present on the backend, but not listed in userData.residences,
               remove it from the backend. */
            const currentResidences = await getResidencesForUser(auth, setBackEndErrors, userID);
            const residenceIDsToNotAddToUser = new Set();
            const residencesToRemoveFromUser = [];

            /* Since userData.residences isn't null, any missing residences
                that exist on the backend should be removed from the backend.
                If userData.residences was null or undefined, then leave
                current residences in place since no update was intended. */
            if (await currentResidences && userData.residences) {
              for (const residence of currentResidences) {
                if (indexOfObj(residence, userData.residences) !== -1) {
                  residenceIDsToNotAddToUser.add(residence);
                } else {
                  residencesToRemoveFromUser.push(residence);
                }
              }
            }

            /* Now add all residences that don't already exist on backend */
            if (userData.residences) {
              if (userIsAuthorized(auth, constants.PERMISSIONS_CAN_CREATE_ALL_USER_RESIDENCES)) {
                for (const residence of userData.residences) {
                  if (!residenceIDsToNotAddToUser.has(residence.id)) {
                    const HOAUserResidenceFormData = new FormData();
                    HOAUserResidenceFormData.append('fk_HOAUser', userID);
                    HOAUserResidenceFormData.append('fk_Residence', residence.id);

                    const addResidenceResponse = await client.post(
                      getUsersForResidenceURL(residence.id),
                      HOAUserResidenceFormData,
                      {
                        headers: { 'Content-Type': 'multipart/form-data',
                                  "X-CSRFToken": csrfToken
                        },
                        withCredentials: true
                      }
                    );

                    if (await addResidenceResponse?.data) {
                      residencesUpdated = true;
                    }
                  }
                }
              }
            }

            /* Now remove residences from backend that shouldn't be owned by this user anymore */
            if (userIsAuthorized(auth, constants.PERMISSIONS_CAN_DELETE_ALL_USER_RESIDENCES)) {
              for (const residenceToRemove of residencesToRemoveFromUser) {
                const deleteResidenceResponse = await client.delete(
                  getURL_UserForResidence(residenceToRemove, userID),
                  {
                    headers: { 'Content-Type': 'multipart/form-data',
                              "X-CSRFToken": csrfToken
                    },
                    withCredentials: true
                  }
                );

                if (deleteResidenceResponse && deleteResidenceResponse.status === 204) {
                  residencesUpdated = true;
                }
              }  
            }

            setSuccessMessages({'Success': `User updated successfully${ residencesUpdated ? ' (along with residences)' : '' }.`});
          }

          return await response?.data;
        } else {
          throw new Error('Error in apiUtils: CSRF Token null or bad Axios client.');
        }
      } else {
        // Rely on built-in reportValidity() call in handleClick function
        // setFrontEndErrors(validationErrors);
      }
    } catch (error) {
      if (!error?.response) {
        setBackEndErrors({'Server Error': 'No Server Response'});
      } else {
        setBackEndErrors(getResponseError(error)); // new way that requires custom User model and validators assigned to fields on the backend
      }
    }
  } else {
    setFrontEndErrors({Error: "You don't have permission to update that user."});
    return null;
  }
}

/* Delete a user from the backend */
export const deleteUser = async (auth, userIDToDelete, setFrontEndErrors, setBackEndErrors, setSuccessMessages) => {

  /* Basic users shouldn't even have permission to delete themselves */
  if(userIsAuthorized(auth, constants.PERMISSIONS_CAN_DELETE_ALL_USERS) || 
   ( userIsAuthorized(auth, constants.PERMISSIONS_CAN_DELETE_USER) && auth.user.id === userIDToDelete)) {
    try {
      const csrfToken = getCSRFToken();
      const client = getClient();
      
      if (csrfToken && client) {
        const response = await client.delete(
          getUserURL(userIDToDelete),
          {
            headers: { 'Content-Type': 'multipart/form-data',
                       "X-CSRFToken": csrfToken
            },
            withCredentials: true
          }
        );
        
        if (await response && response.status === 204) {
          setSuccessMessages({'Success': 'User deleted successfully.'});
        }

        return await response;
      } else {
        throw new Error('Error in apiUtils: CSRF Token null or bad Axios client.');
      }

    } catch (error) {
      if (!error?.response) {
        setBackEndErrors({'Server Error': 'No Server Response'});
      } else {
        setBackEndErrors(getResponseError(error)); // new way that requires custom User model and validators assigned to fields on the backend
      }
    }
  } else {
    setFrontEndErrors({Error: "You don't have permission to delete that user."});
    return null;
  }
}

