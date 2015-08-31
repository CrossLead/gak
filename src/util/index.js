/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} bool: Bool that must be true
 * @return {undefined}
 */
export function assert(bool, message) {
  if (!bool) {
    throw new Error(message);
  }
}
