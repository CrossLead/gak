/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} bool: Bool that must be true
 * @return {undefined}
 */
export function assert(bool, message) {
  if (!bool) {
    throw new Error('Assertion failed: ' + message);
  }
}

export function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}

export function last(arr) {
  return arr[arr.length - 1];
}
