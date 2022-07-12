import React from "react";
import Slider from "react-slick";

import Slider1 from "../../../assets/images/main/slider1.png.webp";
import Student1 from "../../../assets/images/main/student1.png";
import Student2 from "../../../assets/images/main/student2.png";
import Student3 from "../../../assets/images/main/student3.png";

function PrevArrow (props) {
    const { className, style, onClick } = props;
 
    return (
       <svg
          width="50"
          height="20"
          viewBox="0 0 50 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="1">
             <path d="M50 10L2 10" stroke="black" strokeWidth="2" />
             <path d="M11 19L2 10L11 1" stroke="black" strokeWidth="2" />
          </g>
       </svg>
    ); 
 }
 
 function NextArrow (props) {
    const { className, style, onClick } = props;
 
    return (
       <svg
          width="50"
          height="20"
          viewBox="0 0 50 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10L48 10" stroke="black" strokeWidth="2" />
          <path d="M39 1L48 10L39 19" stroke="black" strokeWidth="2" />
       </svg>
    );
 }
 
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
           <div className="landing-h2">Что можете вы</div>

           <div className="can-slider">
              <Slider { ...settings } >
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          Опубликовать тему в приложении
                       </div>
                    </div>
                    <div className="can-slider__item">
                       <img src={Slider1} alt="" />
                    </div>
                 </div>
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          Добавить в тему фразы с переводом и озвучить их
                       </div>
                    </div>
                    <div className="can-slider__item">
                       <img src={Slider1} alt="" />
                    </div>
                 </div>
                 <div>
                    <div className="can-block">
                       <div className="can-block__title">
                          Опубликовать тему в приложении
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
              Что могут делать ваши студенты
           </div>
           <div className="students">
              <div className="student-item">
                 <div className="student-item__title">
                    Найти в приложении и подписаться на ваш аккаунт
                 </div>
                 <div className="student-item__img">
                    <img src={Student1} alt="" />
                 </div>
              </div>
              <div className="student-item">
                 <div className="student-item__title">
                    Увидеть ваш контент – отдельные темы или целые курсы
                 </div>
                 <div className="student-item__img">
                    <img src={Student2} alt="" />
                 </div>
              </div>
              <div className="student-item">
                 <div className="student-item__title">
                    Ознакомиться с темой целиком
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
 