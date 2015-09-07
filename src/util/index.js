/**
 * Utility helper functions
 */

/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} bool: Bool that must be true
 * @return {undefined}
 */
function assert(bool, message, event) {
  if (!bool) {
    gakError('Assertion failed: ' + message, event);
  }
}


/**
 * Wrap an item in an array if it is not already one
 *
 * @param  {Any} Object to be wrapped
 * @return {Array<Any>} array of object
 */
function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}


/**
 * Get the last element from an array
 *
 * @param  {Array<Any>} Array of items
 * @return {Any} Last element of given array
 */
function last(arr) {
  return arr[arr.length - 1];
}


/**
 * Throw a library specific error
 *
 * @param  {String} Error message
 * @param  {Object} (optional) Event object
 * @return {undefined}
 */
function gakError(message, event) {
  message = `gak.js | ${message}`;
  if (event) {
    const pretty = JSON.stringify(event, null, 2);
    message = `${message} | Last Processed Event: \n ${pretty}`;
  }
  throw new Error(message);
}


export default {
  assert,
  gakError,
  last,
  ensureArray
};
