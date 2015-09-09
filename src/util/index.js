/**
 * Utility helper functions
 */

/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} bool: Bool that must be true
 * @return {undefined}
 */
export function assert(bool, message, event) {
  if (!bool) {
    gakError(`Assertion failed${message ? (': ' + message) : ''}`, event);
  }
}


/**
 * Wrap an item in an array if it is not already one
 *
 * @param  {Any} Object to be wrapped
 * @return {Array<Any>} array of object
 */
export function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}


/**
 * Get the last element from an array
 *
 * @param  {Array<Any>} Array of items
 * @return {Any} Last element of given array
 */
export function last(arr) {
  return arr[arr.length - 1];
}


/**
 * Faster forEach function
 *
 * @param  {Array<Any>} arr Array of items
 * @param  {Function} fn Function to call on each item
 * @return {undefined}
 */
export function each(arr, fn) {
  if (!(arr instanceof Array)) {
    gakError(`Non array object passed to each! (${arr})`);
  }
  for (var i=0, l=arr.length; i<l; i++) {
    fn(arr[i], i);
  }
}


/**
 * Throw a library specific error
 *
 * @param  {String} Error messagec
 * @param  {Object} (optional) Event object
 * @return {undefined}
 */
export function gakError(message, event) {
  message = `gak.js | ${message}`;
  if (event) {
    const pretty = JSON.stringify(event, null, 2);
    message = `${message} | Last Processed Event: \n${pretty}`;
  }
  throw new Error(message);
}


export default {
  assert,
  gakError,
  last,
  each,
  ensureArray
}
