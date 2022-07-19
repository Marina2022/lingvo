export function checkForEmptyProperties(obj, exceptionsArray = []) {
   const objectKeysList = Object.keys(obj);
   const filteredKeysList = removeFromArray(objectKeysList, exceptionsArray);

   for (let i = 0; i < filteredKeysList.length; i++) {
      if (obj[filteredKeysList[i]] === "") return false;
   }

   return true;
}

function removeFromArray(original, remove) {
   return original.filter((value) => !remove.includes(value));
}

/**
 * Sets the first letter to upper case and the rest to lower case
 * @param {*} str 
 * @returns 
 */
export const titleCase = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
/**
 * Sets the first letter to upper case and does nothing with the rest
 * @param {*} str 
 * @returns 
 */
export const capitalizeFirstOnlyCase = str => `${str[0].toUpperCase()}${str.slice(1)}`
