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

/**
 * Compares two objects
 * @param {*} o the original object
 * @param {*} c the compared object
 * @param  {...String} excludes keys of original object `a` ignored by comparison
 * @returns {Boolean} `true` if every property of original object `a` included by 
 *    compared object `b` and both properties have the same values. Otherwise - `false` 
 * 
 */
export function compareObjects (o, c, ...excludes) {
   try {
      if (o === null || c === null) {
         return o === c
      } else if (typeof o !== typeof c) {
         return false
      } else if (Array.isArray(o)) {
         if (!Array.isArray(c) || o.length !== c.length) {
            return false
         } else {
            return o.findIndex((item, idx) => !compareObjects(o[idx], c[idx])) === -1
         }
      } else if (typeof o === 'object') {
         // const result =
         return Object.keys(o).filter(key => !excludes || !excludes.includes(key)).findIndex(key => !compareObjects(o[key], c[key])) === -1
         // console.log(result);
         // return result
      } else {
         return o === c
      }
   } catch (e) {
      console.error(e);
      return false
   }
}
