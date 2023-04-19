import { t } from "i18next";
import React from "react";
import {ReactComponent as Quotes} from "../../../assets/images/main/quotes.svg";

const ReviewItem = (props) => {
  const {text, author} = props
  return(
    <div className="review-item">
      <div className="review-item__quote">
        <Quotes />
      </div>
      <div className="review-item__text">{text}</div>
      <div className="review-item__author">{author}</div>
    </div>
  )
}

export default function Top () {
  return (
    <div className="landing-reviews">
      <div className="landing-container">
        <div className="landing-h2">{t("promo.reviews.title")}</div>
        <div className="review-tabs">
          <a href="/#" className="active">{t("promo.reviews.filter.1")}</a>
          <a href="/#">{t("promo.reviews.filter.2")}</a>
          <a href="/#">{t("promo.reviews.filter.3")}</a>
        </div>
        <div className="review-wrapper">
          <ReviewItem text={t("promo.reviews.1.text")} author={t("promo.reviews.1.author")} />
          <ReviewItem text={t("promo.reviews.1.text")} author={t("promo.reviews.1.author")} />
          <ReviewItem text={t("promo.reviews.1.text")} author={t("promo.reviews.1.author")} />
          <ReviewItem text={t("promo.reviews.1.text")} author={t("promo.reviews.1.author")} />
          <ReviewItem text={t("promo.reviews.1.text")} author={t("promo.reviews.1.author")} />
        </div>
      </div>
    </div>
  );
}
 