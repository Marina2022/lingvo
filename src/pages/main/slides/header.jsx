import { t } from "i18next";
import React from "react";
import {ReactComponent as Logo} from "../../../assets/images/main/logo.svg"
import {ReactComponent as HamburgerLine} from "../../../assets/images/main/hamburger-line.svg"

export default function Header () {
   return (
      <header className="landing-header">
         {/* <div className="landing-mobile-menu"></div> */}
         <div className="landing-header__inner">
            <div className="flex-start align-center">
               <div className="landing-header-logo">
                  <Logo fill="#1E62E6" />
               </div>

               <a className="landing-header-hamburger" href="/#">
                  <span className="flex-column">
                  <HamburgerLine />
                  <HamburgerLine />
                  <HamburgerLine />
                  </span>
                  {/* <span className="mobile-hidden">{t("menu.title")}</span> */}
               </a>
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
 