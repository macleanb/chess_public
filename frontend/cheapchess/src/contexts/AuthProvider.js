/* 
  This import was causing problems for jest so I had to add
  an entry in package.json.  Reference:
  https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios
*/
// import axios from 'axios';

/* External Imports */
import { createContext, useState, useEffect } from "react";

/* Internal Imports */
import constants from '../constants';
import getClient from '../utils/api_GetClient';
import getCSRFToken from '../utils/api_GetCSRFToken';
import parseAndSetAuth from '../utils/auth_ParseAndSetAuth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  /* Set default status of auth to 'awaiting data' */
  const [auth, setAuth] = useState({status: constants.STATUS_AWAITING_DATA});

  const client = getClient();
  // const client = axios.create({
  //     baseURL: "http://127.0.0.1:8000"
  // });

  /* After this component mounts, see if user is logged in already; if not, update 
    the user state (which in turn will update the user context for all other components) 
    and navigate to Login */
  useEffect(() => {
  /* Only fetch from the backend if user context is null.  Ensure each of
    these dependencies (auth, navigate, client) are active
    before proceeding */
    const csrfToken = getCSRFToken();

    if (auth && auth.status && client && csrfToken && (auth.status === constants.STATUS_AWAITING_DATA)) {
      client.get(
        constants.URL_AUTHENTICATED_USER,
        {
          headers : {
            'X-CSRFToken' : csrfToken
          },
          withCredentials : true
        }).then(
        function(response) {
          if (response?.data?.user) {
            parseAndSetAuth(response.data, setAuth);
          }
        }).catch(function(e) {
          setAuth({status: constants.STATUS_NOT_AUTHENTICATED});
          
          /* Since receiving a server error (403) is part of the expected
             behavior of verifying the user is NOT authenticated, there's
             no need to log the error to the console.
             Reference: https://stackoverflow.com/questions/57372171/axios-stop-404-error-appearing-in-the-console-log
             */
          console.clear();
        });
    }
  }, [auth, setAuth]); // Re-run each time a dependency comes to life


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContext;


