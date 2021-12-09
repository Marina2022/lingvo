import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import DropDown from "components/drop-down/DropDown.component";
//ACTIONS
import { userLogout, logOutAsync } from "redux/auth/auth.actions";
import { getUserInfoAsync } from "redux/profile/profile.actions.js";
//IMAGES
import notificationIcon from "assets/images/header/notification-bell.png";
import mailIcon from "assets/images/header/mail.png";

const Header = (props) => {
   const {
      userLogout,
      getUserInfoAsync,
      currentUserInfo,
      /*logOutAsync,*/
   } = props;
   const history = useHistory();

   useEffect(() => {
      getUserInfoAsync();
      //eslint-disable-next-line
   }, []);

   const logout = () => {
      userLogout();
      // logOutAsync();
   };

   const dropdownMenuItems = [
      { name: "Личный кабинет", action: () => history.push("/profile") },
      { name: "Выйти", action: logout },
   ];

   return (
      <header className="app-header">
         <div className="app-header__main-link">
            <Link to="/main">Lingvoinsta</Link>
         </div>
         <div className="app-header__links-block">
            <NavLink
               activeClassName="app-header__links-block_active"
               to="/ffffff">
               Мои классы
            </NavLink>
            <NavLink activeClassName="app-header__links-block_active" to="/new">
               Словарь
            </NavLink>
            <NavLink
               activeClassName="app-header__links-block_active"
               to="/topics">
               Темы
            </NavLink>
            <NavLink
               activeClassName="app-header__links-block_active"
               to="/courses">
               Курсы
            </NavLink>
         </div>
         <div className="app-header__profile-block">
            <div>
               <img src={notificationIcon} alt="notification" />
            </div>
            <div>
               <img src={mailIcon} alt="mailicon" />
            </div>
            <DropDown
               src={currentUserInfo?.avatar}
               menuItems={dropdownMenuItems}
               name={currentUserInfo?.name}
            />
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
