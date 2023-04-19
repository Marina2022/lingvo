import { t } from "i18next";
import React from "react";
import {ReactComponent as Thanks} from "../../../assets/images/main/thanks.svg";
import {ReactComponent as London} from "../../../assets/images/main/london.svg";
import { Button, Grid } from "@mui/material";
import StoreIcon from "../../../assets/images/main/google-play-app-store-logo.png";
import PWAIcon from "../../../assets/images/main/pwa-icon.png";
import { isMobile } from "../../../components/prompt-add-to-home/prompt-helper";

export default function Top () {
  const appLink = isMobile.iOs()
    ? "https://apps.apple.com/ru/app/lingvoinsta/id1538776555" 
    : isMobile.Android()
      ? "https://play.google.com/store/apps/details?id=com.lingvonavi.lingvoinsta" 
      : "";

  return (
    <div className="landing-top">
      <div className="landing-top__thanks">
        <Thanks />
      </div>
      <div className="landing-top__brit">
        <London />
      </div>
      <div className="landing-top__inner">
        <div className="landing-h1">
            {t("promo.top.1")}
        </div>
        <p>
            {t("promo.top.2")}
        </p>

        <Grid container>
          <Grid item xs={12} md={6} padding={"1rem"}>
            <div className="landing-h2">
              {t("promo.top.teacher")}
            </div>
            <Button variant="outlined" href="/login">
                {/* {t("promo.top.3")} */}
                <img src={PWAIcon} alt="PWA Icon" height={80} />
            </Button>
          </Grid>
          <Grid item xs={12} md={6} padding={"1rem"}>
            <div className="landing-h2">
              {t("promo.top.pupil")}
            </div>
            <Button variant="outlined" href={appLink}>
                {/* {t("promo.top.4")} */}
              <img src={StoreIcon} alt="Store Icon" height={180} />
            </Button>
              
          </Grid>
        </Grid>
      </div>
    </div>
  );
 }
 