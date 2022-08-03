import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";

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
const Select = ({name, form, select: { label, options, defaultValue, ...otherSelect }, helper, ...otherProps}) => {
   // console.log({name, form, select: { label, options, defaultValue, ...otherSelect }, helper, ...otherProps});

   let [defKey, defVal] = [undefined, undefined]
   
   if (typeof defaultValue === 'object') {
      const objKeys = Object.keys(defaultValue)
      
      if (objKeys.includes('value')) {
         [defKey, defVal] = ['value',  defaultValue.value]
      } else if (objKeys.includes('id')) {
         [defKey, defVal] = ['id', defaultValue.id]            
      }
   } else {
      [defKey, defVal] = [undefined, defaultValue]
   }

   return (
      <FormControl fullWidth {...form} {...otherProps}>
         <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
         {
            defVal !== undefined ?
            <MuiSelect
               labelId={`select-label-${name}`}
               id={`select-label-${name}`}
               label={label}
               {...otherSelect}
               defaultValue={defVal}
            >
            {
               options.map((item, idx) => {
                  const key = defKey ?? item.value !== undefined ? 'value' : 'id'

                  return <MenuItem key={idx} value={item[key] ?? ""}>
                     {item[key] ? item.label : <em>{item.label}</em>}
                  </MenuItem>
               })
            }
               {/* <SelectOptions options={options} defKey={defKey} /> */}
            </MuiSelect> :
            <MuiSelect
               labelId={`select-label-${name}`}
               id={`select-label-${name}`}
               label={label}
               {...otherSelect}
            >
            {
               options.map((item, idx) => {
                  const key = defKey ?? item.id !== undefined ? 'id' : 'value'

                  return <MenuItem key={idx} value={item[key] ?? ""}>
                     {item[key] ? item.label : <em>{item.label}</em>}
                  </MenuItem>
               })
            }
               {/* <SelectOptions options={options} defKey={defKey} /> */}
            </MuiSelect>
         }
         { helper && <FormHelperText>{helper}</FormHelperText> }
      </FormControl>
   );
};

export default Select;
