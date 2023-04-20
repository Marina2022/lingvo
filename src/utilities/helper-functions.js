import Bugsnag from "@bugsnag/js";

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
            const o_sorted = o.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
            const c_sorted = c.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
            return o_sorted.findIndex((item, idx) => !compareObjects(o_sorted[idx], c_sorted[idx])) === -1
         }
      } else if (typeof o === 'object') {
         if (typeof c !== 'object') {
            return false
         } else {
            const oKeys = Object.getOwnPropertyNames(o).filter(key => !excludes || !excludes.includes(key))
            const cKeys = Object.getOwnPropertyNames(c).filter(key => !excludes || !excludes.includes(key))

            return compareObjects(oKeys, cKeys) && 
               oKeys.findIndex(key => !Object.prototype.hasOwnProperty.call(c, key) || !compareObjects(o[key], c[key])) === -1
         }
      } else {
         return o === c
      }
   } catch (e) {
      console.error(e);
      Bugsnag.notify(e)
      return false
   }
}

/**
 * Joins all object values including it's sub-objects
 * @param {Object} o 
 * @param {Number} level 
 * @returns 
 */
export const toDigestString = (o = {}, level = 1) => {
   const keys = Object.getOwnPropertyNames(o)
   const digest = []
   keys
      .sort((a,b) => a < b ? -1 : a > b ? 1 : 0)
      .filter(key => o[key] !== null && o[key] !== undefined)
      .filter(key => level > 0 || (!Array.isArray(o[key]) && typeof o[key] !== 'object'))
      .forEach(key => {
         if (Array.isArray(o[key])) {
            o[key].forEach(element => digest.push(toDigestString(element), level - 1))
         } else if (typeof o[key] === 'object') {
            digest.push(toDigestString(o[key], level - 1))
         } else {
            digest.push(o[key].toString().toLowerCase())
         }
      })
   return digest.join('|')
}


export const validateUri = (URI) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig.test(URI)