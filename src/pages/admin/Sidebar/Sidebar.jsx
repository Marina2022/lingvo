import React from 'react';
import s from './Sidebar.module.scss'
import {Link} from "react-router-dom";

import {ReactComponent as Logo} from "../../../assets/images/main/logo.svg"
import personIcon from '../../../assets/images/admin/person.svg'
import gearIcon from '../../../assets/images/admin/gearIcon.svg'
import outIcon from '../../../assets/images/admin/outIcon.svg'

const Sidebar = () => {
  return (
      <div className={s.sidebar}>
        <Link className={s.logo} to="/main">
          <Logo fill="#1E62E6"/>
        </Link>

        <ul className={s.menu}>
          <li className={`${s.menuItem} ${s.active}`}>
            <Link className={s.menuLink} to="#">
              <img src={personIcon} alt="person icon"/>
              <span>Новые авторы</span>
            </Link>
          </li>

          <li className={s.menuItem}>
            <Link className={s.menuLink} to="#">
              <img src={gearIcon} alt="person icon"/>
              <span>Настройки</span>
            </Link>
          </li>

          <li className={s.menuItem}>
            <Link className={s.menuLink} to="/">
              <img src={outIcon} alt="person icon"/>
              <span>Выйти</span>
            </Link>
          </li>
        </ul>
      </div>
  );
};

export default Sidebar;