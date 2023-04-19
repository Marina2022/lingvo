import { t } from "i18next";
import React from "react";
import {ReactComponent as People} from "../../../assets/images/main/people.svg";
import {ReactComponent as Heart} from "../../../assets/images/main/heart.svg";
import {ReactComponent as Money} from "../../../assets/images/main/money-2.svg";

export default function Top () {
    return (
        <div className="landing-profit">
            <div className="landing-container">
            <div className="landing-h2">
                {t("promo.profit.1")}
            </div>
            <div className="landing-profit__wrapper">
                <div className="profit-item">
                    <People />
                    <div className="profit-item__title">
                        {t("promo.profit.2")}
                    </div>
                    <div className="profit-item__text">
                        {t("promo.profit.3")}
                    </div>
                </div>
                <div className="profit-item">
                    <Heart />
                    <div className="profit-item__title">
                        {t("promo.profit.4")}
                    </div>
                    <div className="profit-item__text">
                        {t("promo.profit.5")}
                        {" "}
                    </div>
                </div>
                <div className="profit-item">
                    <Money />
                    <div className="profit-item__title">
                        {t("promo.profit.6")}
                    </div>
                    <div className="profit-item__text">
                        {t("promo.profit.7")}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
 }
 