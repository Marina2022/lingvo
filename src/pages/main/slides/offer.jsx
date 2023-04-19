import { t } from "i18next";
import React from "react";

import Screen1 from "../../../assets/images/main/screen1.png";
import Screen2 from "../../../assets/images/main/screen2.png";
import Screen3 from "../../../assets/images/main/screen3.png";
import Screen4 from "../../../assets/images/main/screen4.png";
import Screen5 from "../../../assets/images/main/screen5.png";
import { ReactComponent as London } from "../../../assets/images/main/london-2.svg";
import { ReactComponent as Money } from "../../../assets/images/main/money.svg";
import { ReactComponent as Clock } from "../../../assets/images/main/clock.svg";
import { ReactComponent as Okay } from "../../../assets/images/main/okay.svg";

export default function Offer () {
    return (
       <div className="landing-offer">
          <div className="landing-screens">
             <img src={Screen1} width="306" alt="" />
             <img src={Screen2} width="306" alt="" />
             <img src={Screen3} width="306" alt="" />
             <img src={Screen4} width="306" alt="" />
             <img src={Screen5} width="306" alt="" />
          </div>
          <div className="landing-offer-london">
             <London />
          </div>
          <div className="landing-container">
             <div className="landing-h2">{t("promo.offer.1")}</div>
             <p>
                {t("promo.offer.2")}
             </p>
             <div className="offers">
                <div className="offer-item">
                   <div className="offer-item__img">
                      <Money />
                   </div>
                   <div className="offer-item__title">{t("promo.offer.3")}</div>
                   <div className="offer-item__txt">
                      {t("promo.offer.4")}
                   </div>
                </div>
                <div className="offer-item">
                   <div className="offer-item__img">
                      <Clock /> 
                   </div>
                   <div className="offer-item__title">{t("promo.offer.5")}</div>
                   <div className="offer-item__txt">
                      {" "}
                      {t("promo.offer.6")}{" "}
                   </div>
                </div>
                <div className="offer-item">
                   <div className="offer-item__img">
                      <Okay />
                   </div>
                   <div className="offer-item__title">{t("promo.offer.7")}</div>
                   <div className="offer-item__txt">
                      {t("promo.offer.8")}{" "}
                   </div>
                </div>
             </div>
          </div>
       </div>
    );
 }
 