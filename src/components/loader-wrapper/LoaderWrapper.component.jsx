import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderWrapper = ({ children, isLoading, isFetched }) =>
   isLoading ? (
      <div className="loader-wrapper">
         <CircularProgress />
      </div>
   ) : isFetched || isFetched === undefined ? (
      children
   ) : null;

export default LoaderWrapper;
