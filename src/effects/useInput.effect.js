import { t } from "i18next";
import { useState } from "react";

const useInput = (initialState = {}) => {
   const [inputState, setState] = useState(initialState);
   const [invalidMessages, setInvalidMessages] = useState({});
   const handleInput = (event) => {
      const { value, name, type, checked } = event.target;
      if (invalidMessages[name]) {
         const invalidMessagesCopy = { ...invalidMessages };
         delete invalidMessagesCopy[name];
         setInvalidMessages(invalidMessagesCopy);
      }
      // HANDLE VALUES FOR CHECKBOX INPUT
      else if (type === "checkbox") {
         setState((prevState) => ({
            ...prevState,
            [name]: checked ? true : false,
         }));
      } else {
         // HANDLE VALUES FOR OTHER VALUES
         setState((prevState) => ({
            ...prevState,
            [name]: value,
         }));
      }
   };
   // HANDLE VALUES FOR SELECT
   const updateInputState = (value) => {
      if (Object.keys(invalidMessages).length !== 0) {
         const emptyMessages = {};
         Object.keys(invalidMessages).forEach(
            (item) => (emptyMessages[item] = "")
         );
         setInvalidMessages((prevState) => ({ ...prevState, ...emptyMessages }));
      }

      setState((prevState) => ({
         ...prevState,
         ...value,
      }));
   };

   const setInputState = (newState = initialState) => {
      setState(newState);
   };

   const handleInvalidMessage = (event, newMessage) => {
      setInvalidMessages({});
      if (event) {
         if (typeof event === "string") {
            return setInvalidMessages({
               ...invalidMessages,
               [event]: newMessage,
            });
         }

         event.preventDefault();

         let { validationMessage, name, minLength, value } = event.target;
         //change error texts to russian
         validationMessage =
            validationMessage === "Please enter a number."
               ? t("effects.number_needed")
               : validationMessage === "Please fill out this field."
               ? t("effects.mandatory")
               : validationMessage;
         if (minLength && value.length < minLength) {
            validationMessage = t("effects.min_length", { minLength });
         }

         setInvalidMessages({
            ...invalidMessages,
            [name]: newMessage !== "" ? validationMessage : newMessage,
         });
      }
   };

   return {
      inputState,
      handleInput,
      updateInputState,
      setInputState,
      invalidMessages,
      handleInvalidMessage,
   };
};

export default useInput;
