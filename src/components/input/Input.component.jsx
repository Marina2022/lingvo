import React from "react";
import classNames from "classnames";

const Input = (props) => {
   const {
      className,
      variant,
      inputData,
      value = inputData?.inputState[props.name],
      onChange = inputData?.handleInput,
      error = inputData?.invalidMessages,
      onInvalid = inputData?.handleInvalidMessage,
      label,
      icon,
      ...otherProps
   } = props;
   const { name } = props;
   const inputClasses = classNames({
      "li-input": true,
      [className]: !!className,
   });

   const nativeInputClasses = classNames({
      "li-input__native": true,
      "li-header": variant === "header",
      "li-card-header": variant === "card-header",
      "li-login": variant === "login",
   });

   const labelClasses = classNames({
      "li-input__label": true,
   });

   const errorMessageBlockClasses = classNames({
      "li-input__error": true,
      "li-input__error-with-label": label !== undefined,
   });

   const handleChange = async (event) => {
      onChange(event);
   };

   const handleSelect = (event) => {
      if (error) onInvalid(event, "");
   };

   return (
      <div className={inputClasses}>
         {label && <div className={labelClasses}>{label}</div>}
         <div>
            <input
               className={nativeInputClasses}
               autoComplete="off"
               value={value || ""}
               onChange={handleChange}
               onInvalid={onInvalid}
               onSelect={handleSelect}
               {...otherProps}
            />
            {icon && <img src={icon} alt="icon" />}
         </div>
         {!!error?.[name] && (
            <p className={errorMessageBlockClasses}>{error?.[name] || ""}</p>
         )}
      </div>
   );
};

export default Input;
