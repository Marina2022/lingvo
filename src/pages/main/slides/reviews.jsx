import { t } from "i18next";
import React from "react";

const ReviewItem = (props) => {
  const {text, author} = props
  return(
    <div className="review-item">
      <div className="review-item__quote">
        <svg
        width="17"
        height="13"
        viewBox="0 0 17 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.46289 9.52734C7.46289 10.2773 7.1582 10.9336 6.54883 11.4961C5.95117 12.0586 5.24219 12.3398 4.42188 12.3398C3.13281 12.3398 2.14258 11.9121 1.45117 11.0566C0.759766 10.2012 0.414062 9.01758 0.414062 7.50586C0.414062 6.09961 1.00586 4.68164 2.18945 3.25195C3.38477 1.82227 4.82031 0.738281 6.49609 0L7.26953 1.24805C5.94531 1.89258 4.9082 2.64258 4.1582 3.49805C3.4082 4.35352 2.97461 5.39062 2.85742 6.60938H3.8418C4.56836 6.60938 5.16016 6.69141 5.61719 6.85547C6.07422 7.01953 6.44336 7.24805 6.72461 7.54102C6.99414 7.82227 7.18164 8.13281 7.28711 8.47266C7.4043 8.8125 7.46289 9.16406 7.46289 9.52734ZM16.1289 9.52734C16.1289 10.2773 15.8242 10.9336 15.2148 11.4961C14.6172 12.0586 13.9082 12.3398 13.0879 12.3398C11.7988 12.3398 10.8086 11.9121 10.1172 11.0566C9.42578 10.2012 9.08008 9.01758 9.08008 7.50586C9.08008 6.09961 9.67188 4.68164 10.8555 3.25195C12.0508 1.82227 13.4863 0.738281 15.1621 0L15.9355 1.24805C14.6113 1.89258 13.5742 2.64258 12.8242 3.49805C12.0742 4.35352 11.6406 5.39062 11.5234 6.60938H12.5078C13.2344 6.60938 13.8262 6.69141 14.2832 6.85547C14.7402 7.01953 15.1094 7.24805 15.3906 7.54102C15.6602 7.82227 15.8477 8.13281 15.9531 8.47266C16.0703 8.8125 16.1289 9.16406 16.1289 9.52734Z"
          fill="#11141B"
        />
        </svg>
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
 