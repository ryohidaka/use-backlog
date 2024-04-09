/**
 * This function returns the count if it is a number, otherwise it returns a default limit.
 *
 * @param {number} count - The count to be returned. This is optional.
 * @returns {number} The count if it is a number, otherwise the default limit.
 */
export const getCount = (count?: number) => {
  // Set the default limit to 20
  const limit = 20;

  // If count is undefined or not a number, return the limit. Otherwise, return the count.
  return count === undefined || isNaN(count) ? limit : count;
};
