import { t } from "i18next";
import React from "react";
import Slider from "react-slick";

import Slider1 from "../../../assets/images/main/slider1.png.webp";
import Student1 from "../../../assets/images/main/student1.png";
import Student2 from "../../../assets/images/main/student2.png";
import Student3 from "../../../assets/images/main/student3.png";
import {ReactComponent as ArrowLeft} from "../../../assets/images/main/arrow-left.svg"
import {ReactComponent  as ArrowRight} from "../../../assets/images/main/arrow-right.svg"

const PrevArrow = ({ currentSlide, slideCount, ...props }) =>
   (<ArrowLeft 
      {...props} 
      className={
         "slick-prev slick-arrow" +
         (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
   />);

const NextArrow = ({ currentSlide, slideCount, ...props }) =>
   (<ArrowRight
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
   />);
 
export default function Top () {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
     };
   return (
        <div className="landing-can">
        <div className="landing-container">
           <div className="landing-h2">
               {t("promo.can.1")}
            </div>

           <div className="can-slider">
              <Slider { ...settings } >
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          {t("promo.can.2")}
                       </div>
                    </div>
                    <div className="can-slider__item">
                       <img src={Slider1} alt="" />
                    </div>
                 </div>
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          {t("promo.can.3")}
                       </div>
                    </div>
                    <div className="can-slider__item">
                       <img src={Slider1} alt="" />
                    </div>
                 </div>
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          {t("promo.can.4")}
                       </div>
                    </div>
                    <div className="can-slider__item">
                       <img src={Slider1} alt="" />
                    </div>
                 </div>
              </Slider>
           </div> 

        </div>
        <div className="students-block">
           <div className="landing-h2 landing-h2_left">
              {t("promo.can.5")}
           </div>
           <div className="students">
              <div className="student-item">
                 <div className="student-item__title">
                    {t("promo.can.6")}
                 </div>
                 <div className="student-item__img">
                    <img src={Student1} alt="" />
                 </div>
              </div>
              <div className="student-item">
                 <div className="student-item__title">
                    {t("promo.can.7")}
                 </div>
                 <div className="student-item__img">
                    <img src={Student2} alt="" />
                 </div>
              </div>
              <div className="student-item">
                 <div className="student-item__title">
                    {t("promo.can.8")}
                 </div>
                 <div className="student-item__img">
                    <img src={Student3} alt="" />
                 </div>
              </div>
           </div>
        </div>
     </div>
);
 }
 