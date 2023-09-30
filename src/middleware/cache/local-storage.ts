import { TOKENS } from 'utils/constants';
// Set value in a storage
export const SetStorage = (key: string, value: string): void => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

// Get value from a storage
export const GetStorage = (key: string): string => {
  const value = localStorage.getItem(key) || '';

  if (key === TOKENS.CSRF_TOKEN) {
    // Return the CSRF token from local storage.
    return value;
  }

  return value;
};
