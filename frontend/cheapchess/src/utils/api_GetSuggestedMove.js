/* Internal Imports */
import getClient from "./api_GetClient";
import getCSRFToken from "./api_GetCSRFToken";
import getURL_Help from './getURL_Help';
import isSquare from './square_isSquare';

////////////////////////
/// Helper Functions ///
////////////////////////

/**
 * Trims the double-quotation marks off of the str argument and returns the resulting string
 * @param {str} str 
 */
const trimDoubleQuotes = (str) => {
  return str.replace('"', '');
};

/**
 * Trims the spaces off of the str argument and returns the resulting string
 * @param {str} str 
 */
const trimSpaces = (str) => {
  return str.trim();
};

/**
 * Returns an array of squares.  The first element should be a squareID
 * for one of the current player's pieces.  The second element should be
 * a squareID for a square a current player should move their piece to.
 * @param {str} response
 * @param {str} pieceCurrentPosFile
 * @param {str} pieceCurrentPosRank
 * @returns {Array}
 */
const parseResponseToGetSuggestedMove = (
  response,
  ) =>
{
  const responseStr = response.data[0][0][1];
  const indicesOfOpeningAndClosingBrackets = [];

  let nextBracketMustBeClosing = false;
  for (let i  = 0; i < responseStr.length; i++) {
    let currentChar = responseStr[i];

    if(currentChar === '[') {
      if (nextBracketMustBeClosing) {
        throw new TypeError('An imbalanced number of brackets was pased to parseResponseToGetPossibleMoves in api_GetPossibleMoves (1).');
      } else {
        nextBracketMustBeClosing = true; // toggle to ensure the next bracket found is ']'
      }

      indicesOfOpeningAndClosingBrackets.push(i);
    } else if (currentChar === ']') {
      if (!nextBracketMustBeClosing) {
        throw new TypeError('An imbalanced number of brackets was pased to parseResponseToGetPossibleMoves in api_GetPossibleMoves (2).');
      } else {
        nextBracketMustBeClosing = false; // toggle to ensure the next bracket found is '['
      }

      indicesOfOpeningAndClosingBrackets.push(i);
    }
  }

  if (indicesOfOpeningAndClosingBrackets.length % 2 !== 0) { // ensure you have an even number of brackets
    throw new TypeError('An imbalanced number of brackets was pased to parseResponseToGetPossibleMoves in api_GetPossibleMoves (3).');
  }

  const bracketContentsArr = []
  while (indicesOfOpeningAndClosingBrackets.length > 0) {
    const openingBracketIndex = indicesOfOpeningAndClosingBrackets.shift(); // remove from front of arr
    const closingBracketIndex = indicesOfOpeningAndClosingBrackets.shift(); // remove again

    /* Append the text between the brackets to bracketContentsArr */
    bracketContentsArr.push(responseStr.substring(
      openingBracketIndex + 1,
      closingBracketIndex
    ));
  }
  
  /* Clean the data in bracketContentsArr. Remove commas, spaces, quotes.
     Ensure there are no duplicates. Remove any values that aren't squares. */
  const cleanedSquaresDict = {};
  for (const elem of bracketContentsArr) {
    let workingElem = elem; // copy elem
    
    /* This element contains multiple squares. First remove commas */
    if (workingElem.includes(',')) {
      const splitArr = workingElem.split(',');
      
      for (const splitElem of splitArr) {
        let workingSplitElem = splitElem; // copy
        workingSplitElem = trimSpaces(workingSplitElem);
        workingSplitElem = trimDoubleQuotes(workingSplitElem);

        cleanedSquaresDict[workingSplitElem] = workingSplitElem; // ensures there are no duplicates
      }
    } else {
      /* This element contains a single square */
      workingElem = trimSpaces(workingElem);
      workingElem = trimDoubleQuotes(workingElem);
      cleanedSquaresDict[workingElem] = workingElem; // ensures there are no duplicates
    }
  }

  const cleanedSquaresArr = Object.keys(cleanedSquaresDict);
  return cleanedSquaresArr;
};

/**
 * Returns an Array for a suggested move. The first element should be a squareID
 * for one of the current player's pieces.  The second element should be
 * a squareID for a square a current player should move their piece to.
 * @param {str} pieceColor
 * @returns {Array} // i.e. ['a2', 'a3']
 */
const apiGetSuggestedMove = async (
  pieceColor,
  allPieceLocations,
  ) =>
{
  try {
    const url = getURL_Help();
    const client = getClient();
    const csrfToken = getCSRFToken();
    const requestData = {
      pieceColor           :   pieceColor,
      allPieceLocations    :   allPieceLocations,
      request_type         :   'SUGGESTED_MOVE'
    }

    const response = await client.post(
      url,
      requestData,
      {
        headers: {
          'Content-Type' : 'application/json',
          "X-CSRFToken": csrfToken
        },
        withCredentials: true,
      },
    );

    /* Parse the response into a list */
    const parsedResponse = parseResponseToGetSuggestedMove(
      response,
      );

    return parsedResponse;
  } catch (e) {
      console.log(e);
  }
};

export default apiGetSuggestedMove;