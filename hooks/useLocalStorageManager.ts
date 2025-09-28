
const useLocalStorageManager = () => {
    // Set item
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  }

 // remove item
  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  }

  // get item
  const getItem = (key: string) => {
    return localStorage.getItem(key);
  }

  return { setItem, removeItem, getItem };
}

export default useLocalStorageManager