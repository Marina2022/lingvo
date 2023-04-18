import { t } from "i18next";
import React from "react";
import { HrefTemplate, supportEmail } from "../../../utilities/href-template";
import {ReactComponent as PostBox} from "../../../assets/images/main/post-box.svg";
import { Grid } from "@mui/material";
// import {ReactComponent as Logo} from "../../../assets/images/main/logo.svg";
// import {ReactComponent as Instagram} from "../../../assets/images/main/instagram.svg";
// import {ReactComponent as VKontakte} from "../../../assets/images/main/v-kontakte.svg";
// import {ReactComponent as Facebook} from "../../../assets/images/main/facebook.svg";

export default function Top () {
    const personLink = "";
    const offerLink = "";
    return (
        <footer className="landing-footer">
            <div className="landing-container">
                <div className="landing-footer-icon">
                    <PostBox />
                </div>
                <div className="landing-h2">{t("promo.footer.any_questions")}</div>
                
                {/* <div className="landing-footer__text">
                    {t("promo.footer.feedback_form")}
                </div>
                <form action="">
                    <div className="form-element form-element_wild">
                        <label htmlFor="">{t("promo.footer.name")}</label>
                        <input type="text" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="">{t("promo.footer.phone")}</label>
                        <input type="text" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="">E-mail</label>
                        <input type="email" />
                    </div>
                    <button className="btn">{t("actions.send")}</button>
                </form> */}

                {/* <div className="landing-footer-logo">
                    <Logo fill="#11141B" />
                </div>
                <ul className="landing-footer__menu">
                    <li>
                        <a href="/#" className="btn">{t("promo.footer.answers")}</a>
                    </li>
                    <li>
                        <a href="/#" className="btn">{t("promo.footer.price_list")}</a>
                    </li>
                    <li>
                        <a href="/#" className="btn">{t("promo.footer.contacts")}</a>
                    </li>
                </ul> */}

                <div className="landing-footer__links">
                    <a href={HrefTemplate({})} className="btn">{supportEmail}</a>
                    {/* <a href="/#" className="btn"><Instagram /></a>
                    <a href="/#" className="btn"><VKontakte /></a>
                    <a href="/#" className="btn"><Facebook /></a>
                    <a href="tel:+7 123 456 78 90" className="btn">+7 123 456 78 90</a> */}
                </div>
                <Grid container padding="4rem 0 0 0">
                    <Grid item xs={12} md={4} className="footer-copyright">
                        Lingvoinsta &copy; All rights reserved
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <a href={offerLink} className="btn">{t('promo.footer.offer')}</a>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <a href={personLink} className="btn">{t('promo.footer.pesonal_data')}</a>
                    </Grid>
                </Grid>
            </div>
        </footer>
    );
 }
 