/**
 * Throws ValueError if arg isn't a string or doesn't pass
 * regex test
 * @param {str} arg
 */
const validateStrArg = (arg, regex, message) => {
  if (typeof arg !== 'string' || !regex.test(arg)) {
    throw new TypeError(message);
  }
};

export default validateStrArg;