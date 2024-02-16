/* Internal Imports */
import getClient from "./api_GetClient";
import getURL_Help from './getURL_Help';
import isSquare from './square_isSquare';

////////////////////////
/// Helper Functions ///
////////////////////////

/**
 * Returns true if the str argument is the current piece's square
 * @param {str} str
 * @param {str} pieceCurrentPosFile
 * @param {str} pieceCurrentPosRank
 * @returns {boolean}
 */
const isCurrentPiecesSquare = (
  str,
  pieceCurrentPosFile,
  pieceCurrentPosRank
  ) =>
{
  const result = str === pieceCurrentPosFile + pieceCurrentPosRank;
  return result;
};

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
 * Returns an array of squares the current piece can move to
 * @param {str} response
 * @param {str} pieceCurrentPosFile
 * @param {str} pieceCurrentPosRank
 * @returns {Array}
 */
const parseResponseToGetPossibleMoves = (
  response,
  pieceCurrentPosFile,
  pieceCurrentPosRank
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
     Ensure there are no duplicates. Remove the current piece's square
     if it is included.  Remove any values that aren't squares. */
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

        /* Make sure the square (splitElem) isn't the current piece's square
           before adding it to the cleanedSquares arr */
        if (
          isSquare(workingSplitElem) &&
          !isCurrentPiecesSquare(
            workingSplitElem,
            pieceCurrentPosFile,
            pieceCurrentPosRank
          )
        ) {
          cleanedSquaresDict[workingSplitElem] = workingSplitElem; // ensures there are no duplicates
        }
      }
    } else {
      /* This element contains a single square */
      workingElem = trimSpaces(workingElem);
      workingElem = trimDoubleQuotes(workingElem);

      /* Make sure the square (elem) isn't the current piece's square
          before adding it to the cleanedSquares arr */
      if (
        isSquare(workingElem) &&
        !isCurrentPiecesSquare(
          workingElem,
          pieceCurrentPosFile,
          pieceCurrentPosRank
        )
      ) {
        cleanedSquaresDict[workingElem] = workingElem; // ensures there are no duplicates
      }
    }
  }

  const cleanedSquaresArr = Object.keys(cleanedSquaresDict);
  return cleanedSquaresArr;
};

/**
 * Returns an Array of possible moves in file-rank format
 * @param {str} pieceColor
 * @param {boolean} pieceFirstMoveMade
 * @param {str} pieceCurrentPosFile
 * @param {str} pieceCurrentPosRank
 * @param {str} pieceType
 * @returns {Array} // i.e. ['a1', 'b2']
 */
const apiGetPossibleMoves = async (
  pieceColor,
  pieceFirstMoveMade,
  pieceCurrentPosFile,
  pieceCurrentPosRank,
  pieceType,
  ) =>
{
  try {
    const url = getURL_Help();
    const client = getClient();
    const requestData = {
      pieceColor           :   pieceColor,
      pieceFirstMoveMade   :   pieceFirstMoveMade,
      pieceCurrentPosFile  :   pieceCurrentPosFile,
      pieceCurrentPosRank  :   pieceCurrentPosRank,
      pieceType            :   pieceType,
    }

    const response = await client.post(
      url,
      requestData,
      {
        headers: {
          'Content-Type' : 'application/json',
        },
      },
    );

    /* Parse the response into a list */
    const parsedResponse = parseResponseToGetPossibleMoves(
      response,
      pieceCurrentPosFile,
      pieceCurrentPosRank
      );

    return parsedResponse;
  } catch (e) {
      console.log(e);
  }
};

export default apiGetPossibleMoves;