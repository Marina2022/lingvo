import React from "react";
import BootstrapDropdown from "react-bootstrap/Dropdown";

const DropDown = (props) => {
   const { menuItems, ...rest } = props;
   const { name, src } = rest;

   return (
      // <BootstrapDropdown variant="basic">
      <BootstrapDropdown className="li-dropdown">
         <BootstrapDropdown.Toggle id="dropdown-basic">
            {name && (<>{name && <span className="name">{name}</span>}</>)}
            {src && (<><img src={src} alt="avatar" className="avatar" /></>)}
         </BootstrapDropdown.Toggle>

         <BootstrapDropdown.Menu>
            {menuItems &&
               menuItems.map((item, idx) => (item.divider ? 
                  
                  <BootstrapDropdown.Divider key={idx} /> :

                  <BootstrapDropdown.Item onClick={item?.action} key={idx}>
                     {item.name}
                  </BootstrapDropdown.Item>
               ))}
         </BootstrapDropdown.Menu>
      </BootstrapDropdown>
   );
};

export default DropDown;
