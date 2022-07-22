import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import DropDown from "../../../components/drop-down/DropDown.component";
//ACTIONS
import { userLogout, logOutAsync } from "../../../redux/auth/auth.actions";
import { getUserInfoAsync } from "../../../redux/profile/profile.actions.js";
//IMAGES
import notificationIcon from "../../../assets/images/header/notification-bell.png";
import mailIcon from "../../../assets/images/header/mail.png";
import GetMediaContent from "../../../components/get-media-content";
import { Logo as AppLogo } from "../../main/slides/header";
import { t } from 'i18next'

const Header = (props) => {
   const {
      userLogout,
      getUserInfoAsync,
      currentUserInfo,
      /*logOutAsync,*/
   } = props;
   const navigate = useNavigate();

   useEffect(() => {
      getUserInfoAsync();
   }, [getUserInfoAsync]);

   const logout = () => {
      userLogout();
      // logOutAsync();
   };   

   const dropdownMenuItems = [
      { name: t("profile.title"), action: () => navigate("/profile") },
      { divider: true },
      { name: t("actions.sign_out"), action: logout },
   ];   

   const mainMenuItems = [
      // { name: t("menu.classes"), target: "/ffffff" },
      // { name: t("menu.dictionary"), target: "/new" },
      { name: t("lessons.title"), target: "/topics" },
      { name: t("courses.title"), target: "/courses" }
   ];   

   mainMenuItems.forEach(item => item.action = () => navigate(item.target))

   const mainMenuMediaList = {
      xSmall: <></>,
      large: mainMenuItems.map((item, key) => (
         <NavLink className="app-header__links-block_active" to={item.target} key={key}>
            {item.name}
         </NavLink>
      ))
   };

   const xSmallMediaMenuList = [dropdownMenuItems[0], { divider: true }]
      .concat(mainMenuItems)
      .concat([dropdownMenuItems[1], dropdownMenuItems[2]])

   const dropDownMediaList = {
      xSmall: (<DropDown src={currentUserInfo?.avatar} menuItems={xSmallMediaMenuList} />),
      large: (<DropDown src={currentUserInfo?.avatar} menuItems={dropdownMenuItems} name={currentUserInfo?.name} />)
   };
   
   return (
      <header className="app-header">
         <div className="app-header__main-link">
            <Link to="/main"><AppLogo /></Link>
         </div>
         <div className="app-header__links-block"> 
            <GetMediaContent contentList={mainMenuMediaList} />
         </div>
         <div className="app-header__profile-block">
            <div>
               <img src={notificationIcon} alt="notification" />
            </div>
            <div>
               <img src={mailIcon} alt="mailicon" />
            </div>
            <GetMediaContent contentList={dropDownMediaList} />
         </div>
      </header>
   );
};

const mapStateToProps = (state) => {
   const { profile } = state;

   return {
      currentUserInfo: profile.currentUserInfo,
   };
};

const mapDispatchToProps = (dispatch) => ({
   userLogout: () => dispatch(userLogout()),
   logOutAsync: () => dispatch(logOutAsync()),
   getUserInfoAsync: () => dispatch(getUserInfoAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
