import React from "react";
import classNames from "classnames";

// @mui/material components
import Grid from "@mui/material/Grid";

export default function GridItem(props) {
   const { children, relative, className, ...rest } = props;

   const gridClasses = classNames({
      [className]: className,
      "u-relative": !!relative,
   });

   return (
      <Grid item {...rest} className={gridClasses}>
         {children}
      </Grid>
   );
}
