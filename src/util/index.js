/**
 * Utility helper functions
 */

/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} [bool] Bool that must be true
 * @param  {String} [message] additional message for error
 * @param  {Event} [event] error event
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
 * @param  {any} [value]  Object to be wrapped
 * @return {Array<any>} array of object
 */
export function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}


/**
 * Get the last element from an array
 *
 * @param  {Array<any>} [arr]  Array of items
 * @return {any} Last element of given array
 */
export function last(arr) {
  return arr[arr.length - 1];
}


/**
 * Throw a library specific error
 *
 * @param  {String} [message] Error messagec
 * @param  {Object} [event] (optional) Event object
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
  ensureArray
}
