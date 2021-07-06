import React from "react";
import BootstrapDropdown from "react-bootstrap/Dropdown";

const DropDown = (props) => {
   const { menuItems, ...rest } = props;
   const { name, src } = rest;

   return (
      <BootstrapDropdown className="li-dropdown">
         <BootstrapDropdown.Toggle id="dropdown-basic">
            {src && (
               <>
                  {name && <span className="name">{name}</span>}
                  <img src={src} alt="avatar" className="avatar" />
               </>
            )}
         </BootstrapDropdown.Toggle>

         <BootstrapDropdown.Menu>
            {menuItems &&
               menuItems.map((item, idx) => (
                  <BootstrapDropdown.Item onClick={item?.action} key={idx}>
                     {item.name}
                  </BootstrapDropdown.Item>
               ))}
         </BootstrapDropdown.Menu>
      </BootstrapDropdown>
   );
};

export default DropDown;
