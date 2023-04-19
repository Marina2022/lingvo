import { t } from "i18next";
import React from "react";
import {ReactComponent as Logo} from "../../../assets/images/main/logo.svg"
// import {ReactComponent as HamburgerLine} from "../../../assets/images/main/hamburger-line.svg"
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;


export default function Header () {
   const navigate = useNavigate();

   const options = [
      { key: "login", label: t('promo.header.menu.login'), action: () => navigate("/login") }
   ];
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);
   
   return (
      <header className="landing-header">
         {/* <div className="landing-mobile-menu"></div> */}
         <div className="landing-header__inner">
            <div className="flex-start align-center">
               <div className="landing-header-logo">
                  <Logo fill="#1E62E6" />
               </div>

               {/* <a className="landing-header-hamburger" href="/#">
                  <span className="flex-column">
                     <HamburgerLine />
                     <HamburgerLine />
                     <HamburgerLine />
                  </span>
                  {/* <span className="mobile-hidden">{t("menu.title")}</span> * /}
               </a> */}
               <div className="landing-header-hamburger">
                  <IconButton
                     aria-label="more"
                     id="long-button"
                     aria-controls={open ? 'long-menu' : undefined}
                     aria-expanded={open ? 'true' : undefined}
                     aria-haspopup="true"
                     onClick={handleClick}
                     >
                     {!open ? <MenuIcon /> : <CloseIcon />}
                  </IconButton>
                  <Menu
                     id="long-menu"
                     MenuListProps={{
                        'aria-labelledby': 'long-button',
                     }}
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     PaperProps={{
                        style: {
                           maxHeight: ITEM_HEIGHT * 4.5,
                           width: Math.max(options.map(({label}) => Math.max(label.length, 20))) + 'ch',
                        },
                     }}
                     >
                     {options.map(({key, label, action}) => (
                        <MenuItem key={key} onClick={action}>
                           {label}
                        </MenuItem>
                     ))}
                     </Menu>
               </div>
            </div>
 
             {/* <div className="landing-header__auth">
                <a
                   href="/login"
                   className="auth-btn auth-btn_login mobile-hidden">
                   {t("actions.sign_in")}
                </a>
                <a
                   href="/register"
                   className="auth-btn auth-btn_register mobile-hidden">
                   {t("actions.sign_up")}
                </a>
             </div> */}
         </div>
      </header>
   );
}
 