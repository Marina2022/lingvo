import { t } from "i18next";
import React from "react";

const TariffItem = (props) => {
  const { name } = props

  return(
    <div className="tariff-item">
      <div className="tariff-item__title">{t(`promo.tariff.${name}.name`)}</div>
      <div className="tariff-item__price">{t(`promo.tariff.${name}.detail1`)}</div>
      <div className="tariff-item__long">{t(`promo.tariff.${name}.detail2`)}</div>
      <div className="tariff-item__text">{t(`promo.tariff.${name}.comment`)}</div>
      <div className="tariff-item__info-title">{t(`promo.tariff.publications`)}</div>
      <div className="tariff-item__info-detail">{t(`promo.tariff.${name}.n_of_publications`)}</div>
      <div className="tariff-item__info-title">{t(`promo.tariff.tasks`)}</div>
      <div className="tariff-item__info-detail">{t(`promo.tariff.${name}.n_of_tasks`)}</div>
      <div className="tariff-item__info-title">{t(`promo.tariff.subscribers`)}</div>
      <div className="tariff-item__info-detail">{t(`promo.tariff.${name}.n_of_subscribers`)}</div>
      <button className="btn">{t("actions.buy")}</button>
    </div>
  )
}

export default function Top () {
  return (
    <div className="landing-tariff">
      <div className="landing-container">
      <div className="landing-h2">{t("promo.tariff.title")}</div>
      <div className="landing-tariff__wrapper">
        <TariffItem name="starter" />
        <TariffItem name="optimum" />
        <TariffItem name="profi" />
      </div>
      <div className="landing-tariff__text">{t("promo.tariff.is_not_suitable")}</div>
      <a href="/#" className="landing-link">{t("promo.tariff.individual")}</a>
      </div>
    </div>
  );
}
 