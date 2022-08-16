import React from "react";
import classNames from "classnames";

// BOOTSTRAP COMPONENTS
import { LoadingButton } from "@mui/lab";

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
      <LoadingButton
         loading={isLoading}
         variant={variant}
         className={btn_styles}
         {...otherProps}
         disabled={disabled || isLoading}
         startIcon={(typeof src === 'object') ? src : undefined}
      >
         {src && (typeof src === 'string') && <img src={src} alt="icon" />}         
         <span>{children}</span>
      </LoadingButton>
   );
};

export default Button;
