//Check if object is empty
export const isEmpty = (obj: {}): boolean => {
  return Object.entries(obj).length === 0;
};
