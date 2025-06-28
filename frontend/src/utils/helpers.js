// frontend/src/utils/helpers.js

/**
 * Formats an address to a shorter version, e.g., 0x123...abc.
 * @param {string} address - The full Ethereum address.
 * @param {number} [startChars=6] - Number of characters to show from the start.
 * @param {number} [endChars=4] - Number of characters to show from the end.
 * @returns {string} The formatted address.
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length < startChars + endChars + 2) return address; // +2 for '0x'
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};

/**
 * Formats a number with commas as thousands separators.
 * @param {number | string} number - The number to format.
 * @param {number} [decimals=2] - Number of decimal places to show.
 * @returns {string} The formatted number string.
 */
export const formatNumber = (number, decimals = 2) => {
  const num = parseFloat(number);
  if (isNaN(num)) return 'N/A';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Formats a balance from Wei to Ether (or other denomination).
 * @param {string | ethers.BigNumber} weiBalance - The balance in Wei.
 * @param {number} [decimals=18] - The number of decimals for the token (default is 18 for Ether).
 * @param {number} [displayDecimals=4] - How many decimal places to display after conversion.
 * @returns {string} The formatted balance string.
 */
export const formatBalance = (weiBalance, decimals = 18, displayDecimals = 4) => {
  if (!weiBalance) return formatNumber(0, displayDecimals);
  try {
    // If it's an ethers.BigNumber, convert it. Otherwise, assume it's a string/number.
    const balanceInUnits = typeof weiBalance === 'string' || typeof weiBalance === 'number'
      ? parseFloat(weiBalance) / (10 ** decimals)
      : parseFloat(ethers.utils.formatUnits(weiBalance, decimals));
    return formatNumber(balanceInUnits, displayDecimals);
  } catch (error) {
    console.error("Error formatting balance:", error);
    return 'Error';
  }
};


/**
 * Debounces a function, delaying its execution until after a certain time has passed
 * since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Converts a JavaScript Date object or a timestamp string to a more readable format.
 * @param {Date | string | number} dateInput - The date to format.
 * @param {object} [options] - Formatting options for toLocaleDateString and toLocaleTimeString.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateInput, options = {
  year: 'numeric', month: 'short', day: 'numeric',
  // hour: '2-digit', minute: '2-digit'
}) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString(undefined, options);
    // If time is also needed:
    // return `${date.toLocaleDateString(undefined, options.date)} ${date.toLocaleTimeString(undefined, options.time)}`;
  } catch (error) {
    console.error("Error formatting date:", dateInput, error);
    return "Error Date";
  }
};

/**
 * Simple utility to sleep for a given number of milliseconds.
 * @param {number} ms - Milliseconds to sleep.
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Generates a placeholder IPFS URI for metadata.
 * In a real app, you'd upload metadata to Pinata or a similar service.
 * @param {object} metadata - The metadata object.
 * @returns {string} A mock IPFS URI.
 */
export const generateMockIpfsURI = (metadata) => {
  const hash = btoa(JSON.stringify(metadata)).slice(0, 46); // Create a pseudo-hash
  return `ipfs://${hash}`;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get a value from localStorage safely.
 * @param {string} key The key to retrieve.
 * @param {any} defaultValue The default value if key is not found or parsing fails.
 * @returns {any} The retrieved value or the default value.
 */
export const getFromLocalStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Set a value in localStorage safely.
 * @param {string} key The key to set.
 * @param {any} value The value to store.
 */
export const setInLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
};

// Example of using ethers if it's globally available or imported in components
// Make sure ethers is installed and imported where needed if you use formatBalance with BigNumber
// import { ethers } from 'ethers'; // If you need it for formatBalance
// Note: `ethers` is used in `blockchainService.js`, so it should be available if that service is used.
// If not, you might need to pass `ethers.utils.formatUnits` as a parameter or handle BigNumber differently.
