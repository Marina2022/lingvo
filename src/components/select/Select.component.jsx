import React from "react";
import ReactSelect from "react-select";

const Select = ({ className, label, ...oterProps }) => {
   return (
      <div className="li-custom-select">
         {label && <div className="li-custom-select__label">{label}</div>}
         <ReactSelect
            classNamePrefix="li-select"
            className={"li-select " + className}
            theme={(theme) => ({
               ...theme,
               colors: {
                  ...theme.colors,
                  primary50: "#7681b3",
                  primary: "#7681b3",
               },
            })}
            {...oterProps}
         />
      </div>
   );
};

export default Select;
