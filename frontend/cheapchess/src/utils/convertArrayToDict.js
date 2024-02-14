/**
 * Takes in an array of dicts and enters each array element
 * into a dict using a provided key from each dict in the 
 * original array
 * @param {Array} arr 
 * @param {str} keyName 
 * @param {str} fieldName 
 * @returns {Object}
 */
const convertArrayToDict = (arr, keyName) => {
  if (arr && Array.isArray(arr)) {
    const result = {}
    for (const elem of arr) {
      if (keyName) {
        const key = elem[keyName];
        result[key] = elem;
      }
    }
    return result;
  }
  return {};
}

export default convertArrayToDict;