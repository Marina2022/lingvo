import React, { useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
const SelectOptions = ({options, defKey}) => options.map((item, idx) => {
   const key = defKey ?? (item.id !== undefined ? 'id' : 'value')

   return <MenuItem key={idx} value={item[key] ?? ""}>
      {item[key] ? item.label : <em>{item.label}</em>}
   </MenuItem>
})

/**
 * 
 * @param {{name:String, form:{}, select:{}, helper:{}, otherProps:any}} param0 
 * @returns 
 */
const Select = ({name, form, select: { label, options, defaultValue, onChange, emptyValue = '', ...otherSelect }, helper, ...otherProps}) => {
   // console.log({name, form, select: { label, options, defaultValue, ...otherSelect }, helper, ...otherProps});
   const [defKey, setDefKey] = useState(undefined)
   const [defVal, setDefVal] = useState('')
   
   useEffect(() => {
      if (typeof defaultValue === 'object') {
         const objKeys = Object.keys(defaultValue)
         
         if (!objKeys.includes('value')) {
            setDefKey('id')
            setDefVal(defaultValue.id ?? undefined)
         } else {
            setDefKey('value')
            setDefVal(defaultValue.value ?? undefined)
         }
      } else {
         setDefKey('value')
         setDefVal(defaultValue ?? undefined)
      }
   }, [defaultValue])

   return (
      <FormControl fullWidth {...form} {...otherProps}>
         <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
         {
            ((defVal)=> {
               // console.log(defaultValue, defVal);
               return (
                  defVal !== undefined
                  ?  <MuiSelect
                        labelId={`select-label-${name}`}
                        id={`select-label-${name}`}
                        label={label}
                        {...otherSelect}
                        value={defVal}
                        onChange={(e)=>{
                           // console.log(defKey, defVal);
                           setDefVal(e.target[defKey])
                           // console.log(defKey, defVal);
                           onChange && onChange(e)
                        }}
                     >
                     {
                        options.map((item, idx) => 
                           <MenuItem key={idx} value={item[defKey] ?? ""}>
                              {item[defKey] !== emptyValue ? item.label : <em>{item.label}</em>}
                           </MenuItem>
                        )
                     }
                        {/* <SelectOptions options={options} defKey={defKey} /> */}
                     </MuiSelect>  
                  :  <MuiSelect
                        labelId={`select-label-${name}`}
                        id={`select-label-${name}`}
                        label={label}
                        {...otherSelect}
                     >
                     {
                        options.map((item, idx) => 
                           <MenuItem key={idx} value={item[defKey] ?? ""}>
                              {item[defKey] !== emptyValue ? item.label : <em>{item.label}</em>}
                           </MenuItem>
                        )
                     }
                        {/* <SelectOptions options={options} defKey={defKey} /> */}
                     </MuiSelect>
               )
            })(defVal)           
         }
         { helper && <FormHelperText>{helper}</FormHelperText> }
      </FormControl>
   );
};

export default Select;
