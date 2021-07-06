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
