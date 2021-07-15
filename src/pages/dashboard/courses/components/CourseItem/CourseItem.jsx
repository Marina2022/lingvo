import React from "react";

const CourseItem = (props) => {
   return (
      <a className="course-item" href="#">
         {props.courseStatus && (
            <div className="course-item__status">Опубликован</div>
         )}

         <div className="course-item__title">{props.courseName}</div>
         <div className="course-item__info">{props.courseInfo}</div>
         <div className="course-item__bottom">
            <div className="course-item__themes">{props.courseTheme}</div>
            <div className="course-item__themes">
               Цена: {props.coursePrice} Р
            </div>
         </div>
      </a>
   );
};

export default CourseItem;