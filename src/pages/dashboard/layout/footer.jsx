import { t } from "i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as CollectionPlayFill } from '../../../assets/images/icons/collection-play-fill.svg';
import { ReactComponent as PersonFill } from '../../../assets/images/icons/person-fill.svg';
import { ReactComponent as PlayCircleFill } from '../../../assets/images/icons/play-circle-fill.svg';

import './footer.scss'


const Footer = (props) => {
  const {
    userLogout,
    getUserInfoAsync,
    currentUserInfo,
  } = props;
  const navigate = useNavigate();

  const menuItems = [
    { name: t("lessons.title")    , action: () => navigate("/topics") , icon: <PlayCircleFill />     },
    { name: t("courses.title")   , action: () => navigate("/courses"), icon: <CollectionPlayFill /> },
    { name: t("profile.title")   , action: () => navigate("/profile"), icon: <PersonFill />         },
    // { name: t("actions.sign_out"), action: userLogout                , icon: <></>                  },
  ];   

  const [activeItem, setActiveItem] = useState(menuItems[0].name)

  return <>
    <footer className="app-footer">
    {
      menuItems.map((item, key) => 
        <div className={`app-footer__menu-item${activeItem === item.name ? '__active' : ''}`} key={key} onClick={() => { setActiveItem(item.name); item.action(); }}>
          {item.icon}
          <div className={`app-footer__menu-item${activeItem === item.name ? '__active' : ''}__label`}>{item.name}</div>
        </div>
      ) 
    }
    </footer>
  </>
}

export default Footer