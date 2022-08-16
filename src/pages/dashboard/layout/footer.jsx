import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import './footer.scss'
import { getUserInfoAsync } from "../../../redux/profile/profile.actions";
import { connect } from "react-redux";


const Footer = (props) => {
  const {
    getUserInfoAsync,
    currentUserInfo,
  } = props;

  useEffect(() => {
    !currentUserInfo && getUserInfoAsync();
  }, [currentUserInfo, getUserInfoAsync]);

  const navigate = useNavigate();

  const menuItems = [
    { name: t("trainings.title") , pattern: /\/topics/i , action: () => navigate("/topics") , icon: <AudioFileOutlinedIcon />     },
    { name: t("courses.title")   , pattern: /\/courses/i, action: () => navigate("/courses"), icon: <LibraryMusicOutlinedIcon /> },
    { name: t("profile.title")   , pattern: /\/profile/i, action: () => navigate("/profile"), icon: <PersonOutlinedIcon />         },
  ]   

  const getActiveMenu = () => {
    const menuItem = menuItems.find(item => (document.documentURI.match(item.pattern)?.length ?? 0) > 0)
    return menuItem?.name ?? menuItems[0].name
  }

  const [activeMenu, setActiveMenu] = useState(getActiveMenu())

  return <>
    <footer id="app-footer" className="app-footer">
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

const mapStateToProps = ({profile}) => ({ currentUserInfo: profile.currentUserInfo })

const mapDispatchToProps = (dispatch) => ({ getUserInfoAsync: () => dispatch(getUserInfoAsync()) });

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
