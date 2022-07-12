import React from "react";

const CourseItem = (props) => {
   return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className="course-item" onClick={props.onClick}>
         {props.courseStatus && (
            <div className="course-item__status">Опубликован</div>
         )}

         <div className="course-item__title">{props.courseName}</div>
         <div className="course-item__info">{props.courseInfo}</div>
         <div className="course-item__bottom">
            <div className="course-item__themes">{props.courseTheme}</div>
            <div className="course-item__themes"> { 
               props.coursePrice === 0 ? 
               'Бесплатно' :
               'Цена: ₽' + props.coursePrice
            }               
            </div>
         </div>
      </a>
   );
};

export default CourseItem;
