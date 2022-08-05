import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import React from "react";

const DropDown = (props) => {
   const { menuItems, ...rest } = props;
   const { name, src } = rest;

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

   return (
   <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: 'inherit', height:'inherit', font:'inherit', color:'inherit', '>':{ fontSize: 'inherit' } }}
      >
         {name && (<>{name && <><span className="name">{name}</span>&nbsp;</>}</>)}
         {src && (<Avatar src={src} alt="avatar" sx={{ width: '2em', height: '2em' }} />)}
      </Button>
      <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
         'aria-labelledby': 'basic-button',
         }}
         sx={{fontSize:'inherit'}}
      >
      {
         menuItems && menuItems.map((item, idx) => (
            item.divider ? 
            <Divider key={idx} /> :
            <MenuItem onClick={() => { handleClose(); item?.action(); }} key={idx}>{item.name}</MenuItem>
         ))
      }         
      </Menu>
   </>
   );
};

export default DropDown;
