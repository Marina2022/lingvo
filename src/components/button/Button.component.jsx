import React from "react";
import classNames from "classnames";

// BOOTSTRAP COMPONENTS
import BootstrapButton from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Button = (props) => {
   const {
      children,
      className,
      variant,
      isLoading,
      disabled,
      src,
      ...otherProps
   } = props;

   const btn_styles = classNames({
      "li-button": true,
      "li-button__disabled": disabled,
      [className]: className,
   });

   return (
      <BootstrapButton
         variant={variant}
         className={btn_styles}
         {...otherProps}
         disabled={disabled || isLoading}>
         {src && <img src={src} alt="icon" />}
         <span>{children}</span>
         {isLoading && (
            <div className="spinner">
               <Spinner animation="grow" variant="light" />
            </div>
         )}
      </BootstrapButton>
   );
};

export default Button;
