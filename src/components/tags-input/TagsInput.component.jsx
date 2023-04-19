import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Downshift from "downshift";

// const useStyles = makeStyles((theme) => ({
//    chip: {
//       margin: theme.spacing(0.5, 0.25),
//    },
// }));

export default function TagsInput({ ...props }) {
   // const classes = useStyles();
   const { selectedTags, placeholder, tags, label, ...other } = props;
   const [inputValue, setInputValue] = React.useState("");
   const [selectedItem, setSelectedItem] = React.useState([]);
   // console.log("TagsInput: ", props);
   useEffect(() => {
      // console.log("useEffect: setSelectedItem", tags);
      setSelectedItem(tags);
   }, [tags]);

   function handleKeyDown(event) {
      if (event.key === "Enter") {
         const newSelectedItem = [...selectedItem];
         const duplicatedValues = newSelectedItem.indexOf(
            event.target.value.trim()
         );

         if (duplicatedValues !== -1) {
            setInputValue("");
            return;
         }
         if (!event.target.value.replace(/\s/g, "").length) return;

         newSelectedItem.push(event.target.value.trim());
         setSelectedItem(newSelectedItem);
         //
         selectedTags(newSelectedItem);

         setInputValue("");
      }
      if (
         selectedItem.length &&
         !inputValue.length &&
         event.key === "Backspace"
      ) {
         setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
         //
         selectedTags(selectedItem.slice(0, selectedItem.length - 1));
      }
   }
   function handleChange(item) {
      let newSelectedItem = [...selectedItem];
      if (newSelectedItem.indexOf(item) === -1) {
         newSelectedItem = [...newSelectedItem, item];
      }
      setInputValue("");
      setSelectedItem(newSelectedItem);
      //
      selectedTags(newSelectedItem);
   }

   const handleDelete = (item) => () => {
      const newSelectedItem = [...selectedItem];
      newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
      setSelectedItem(newSelectedItem);
      //
      selectedTags(newSelectedItem);
   };

   function handleInputChange(event) {
      setInputValue(event.target.value);
   }
   return (
      <div className="custom-tags-input">
         <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}>
            {({ getInputProps }) => {
               const {
                  onBlur,
                  onChange,
                  onFocus,
                  ...inputProps
               } = getInputProps({
                  onKeyDown: handleKeyDown,
                  placeholder,
               });
               return (
                  <div className="custom-tags-input__text-field">
                     {label && (
                        <div className="custom-tags-input__text-field_label">
                           {label}
                        </div>
                     )}
                     <TextField
                        InputProps={{
                           startAdornment: selectedItem.map((item) => (
                              <Chip
                                 key={item}
                                 tabIndex={-1}
                                 label={item}
                                 // className={classes.chip}
                                 onDelete={handleDelete(item)}
                              />
                           )),
                           onBlur,
                           onChange: (event) => {
                              handleInputChange(event);
                              onChange(event);
                           },
                           onFocus,
                        }}
                        {...other}
                        {...inputProps}
                     />
                  </div>
               );
            }}
         </Downshift>
      </div>
   );
}
TagsInput.defaultProps = {
   tags: [],
};
TagsInput.propTypes = {
   selectedTags: PropTypes.func.isRequired,
   tags: PropTypes.arrayOf(PropTypes.string),
};
