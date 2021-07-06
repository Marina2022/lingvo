import React from "react";
import classNames from "classnames";

const Form = ({ onSubmit, children, className }) => {
   const formClasses = classNames({
      "custom-form": true,
      [className]: className !== undefined,
   });
   return (
      <form onSubmit={onSubmit} className={formClasses}>
         {children}
      </form>
   );
};

export default Form;
