/**
 * Returns an exclusive range of integers between
 * start and end (not including start and end)
 * @param {int} start
 * @param {int} end
 * @returns {int}
*/
const getExclusiveRange = (start, end) => {
  if (!Number.isInteger(start)) {
    throw new TypeError(`Invalid argument (start) provided to getExclusiveRange (${start})`);
  } else if (!Number.isInteger(end)) {
    throw new TypeError(`Invalid argument (end) provided to getExclusiveRange (${end})`);
  } else if (start === end) {
    return [];
  }

  const result = [];

  if (start < end) {
    for (let counter = start + 1; counter < end; counter ++) {
      result.push(counter);
    }
  } else {
    for (let counter = start - 1; counter > end; counter --) {
      result.push(counter);
    }
  }

  return result;
};

export default getExclusiveRange;