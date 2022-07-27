import { t } from "i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as CollectionPlayFill } from '../../../assets/images/icons/collection-play-fill.svg';
import { ReactComponent as PersonFill } from '../../../assets/images/icons/person-fill.svg';
import { ReactComponent as PlayCircleFill } from '../../../assets/images/icons/play-circle-fill.svg';

import './footer.scss'


const Footer = () => {

  const navigate = useNavigate();

  const menuItems = [
    { name: t("trainings.title") , pattern: /\/topics/i , action: () => navigate("/topics") , icon: <PlayCircleFill />     },
    { name: t("courses.title")   , pattern: /\/courses/i, action: () => navigate("/courses"), icon: <CollectionPlayFill /> },
    { name: t("profile.title")   , pattern: /\/profile/i, action: () => navigate("/profile"), icon: <PersonFill />         },
  ]   

  const getActiveMenu = () => {
    const menuItem = menuItems.find(item => (document.documentURI.match(item.pattern)?.length ?? 0) > 0)
    return menuItem?.name ?? menuItems[0].name
  }

  const [activeMenu, setActiveMenu] = useState(getActiveMenu())

  return <>
    <footer className="app-footer">
    {
      menuItems.map((item, key) => 
        <div className={`app-footer__menu-item${activeMenu === item.name ? '__active' : ''}`} key={key} onClick={() => { setActiveMenu(item.name); item.action(); }}>
          {item.icon}
          <div className={`app-footer__menu-item${activeMenu === item.name ? '__active' : ''}__label`}>{item.name}</div>
        </div>
      ) 
    }
    </footer>
  </>
}

export default Footer