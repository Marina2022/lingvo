import React from "react";
import classNames from "classnames";
import Grid from "@mui/material/Grid";

export default function GridContainer(props) {
   const { children, relative, className, spacing = 2, ...rest } = props;

   const gridStyles = classNames({
      "u-relative": !!relative,
      [className]: className,
   });

   return (
      <Grid container spacing={spacing} className={gridStyles} {...rest}>
         {children}
      </Grid>
   );
}
