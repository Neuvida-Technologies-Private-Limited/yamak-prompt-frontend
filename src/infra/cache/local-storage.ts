// Set value in a storage
export const SetStorage = (key: string, value: string): void => {
    if (value) {
        localStorage.setItem(key, value)
      } else {
        localStorage.removeItem(key)
      }
}

// Get value from a storage
export const GetStorage = (key: string): string => {
    return localStorage.getItem(key) || ''
}
