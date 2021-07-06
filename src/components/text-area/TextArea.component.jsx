import React from "react";

import TextareaAutosize from "react-textarea-autosize";

// let timeOutId;
const TextArea = (props) => {
   const {
      onChange,
      value,
      name,
      otherTextareaProps,
      minRows,
      maxRows,
      placeholder,
      label,
   } = props;

   return (
      <div className="custom-textarea">
         {label && <div className="custom-textarea__label">{label}</div>}
         <TextareaAutosize
            style={{ height: "64px" }}
            className="input"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...otherTextareaProps}
            minRows={minRows}
            maxRows={maxRows}
         />
      </div>
   );
};

export default TextArea;
