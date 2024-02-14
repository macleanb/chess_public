const getCSRFToken = () => {
  let result = null;

  //Read all cookies
  const allCookies = document.cookie;

  if (allCookies) {
    // Get specific cookie (csrftoken)
    result = allCookies
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
  }

  return result;
};

export default getCSRFToken;