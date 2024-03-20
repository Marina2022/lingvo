import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DropDown from "../../../components/drop-down";

import { userLogout, logOutAsync } from "../../../redux/auth/auth.actions";
import { getUserInfoAsync } from "../../../redux/profile/profile.actions.js";

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GetMediaContent from "../../../components/get-media-content";
import {ReactComponent as Logo} from "../../../assets/images/main/logo.svg"
import { t } from 'i18next'
import { HrefTemplate } from "../../../utilities/href-template";

import s from './AdminHeader.module.scss'
import arrow from '../../../assets/images/admin/arrow.svg'

const AdminHeader = (props) => {
    
  const {
    userLogout,
    getUserInfoAsync,
    currentUserInfo,
  } = props;

  // console.log('currentUserInfo', currentUserInfo)
  
  const navigate = useNavigate();

  useEffect(() => {
    !currentUserInfo && getUserInfoAsync();
  }, [currentUserInfo, getUserInfoAsync]);

  const logout = () => {
    userLogout();
  };

  const dropdownMenuItems = [
    { name: t("profile.title"), action: () => navigate("/profile") },
    { divider: true },
    { name: t("actions.sign_out"), action: logout },
  ];

  const mainMenuItems = [    
    { name: t("trainings.title"), target: "/topics" },    
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
      <header id="app-header" className="app-header">
        <div className="app-header__profile-block">
          <div className={s.wrapper}>
            <GetMediaContent contentList={dropDownMediaList}/>
          </div>
          <button className={s.profileBtn}><img src={arrow} alt="dropdown"/></button>
        </div>
      </header>
  );
};

const mapStateToProps = (state) => {
  const {profile } = state;

  return {
    currentUserInfo: profile.currentUserInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
  logOutAsync: () => dispatch(logOutAsync()),
  getUserInfoAsync: () => dispatch(getUserInfoAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
