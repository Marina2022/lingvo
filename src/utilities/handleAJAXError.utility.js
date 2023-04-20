import Bugsnag from "@bugsnag/js";

const handleAJAXError = (error, messageName) => {
   console.log(error, messageName);
   if (!error.message) return "Something went wrong.";
   
   Bugsnag.notify(error)

   const data = error?.response?.data;
   const errorMessageArr = [];
   if (data) {
      for (const arrMessage of Object.values(data)) {
         errorMessageArr.push(arrMessage);
      }  
   }
   const errorMessage = errorMessageArr.flat().join("\n• ");
   if (errorMessage) {
      return "• " + errorMessage;
   } else {
      return "Something went wrong.";
   }
};

export default handleAJAXError;
