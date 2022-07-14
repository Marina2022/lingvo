import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS

import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";

import "./_courses.styles.scss";
import plusIcon from "../../../assets/images/topics/plus.png";
import CourseItem from "./components/CourseItem/CourseItem";
import Pagination from "./components/Pagination/Pagination";
import { getCoursesAsync } from "../../../redux/courses/courses.actions";

const CoursesPage = (props) => { 
   const { getCoursesAsync } = props;
   const { publishedCourses } = useSelector((state) => state.courses);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(
      () => { getCoursesAsync(); }, 
      [getCoursesAsync]
   );   
   return (
      <div className="courses-page">
         <div className="courses-page__heading-block">
            <h1>Курсы</h1>
            <div>
               <Input name="search" type="text" placeholder="Поиск" required />
            </div>
         </div>
         <div className="settings-panel">
            <Button
               onClick={() => {
                  dispatch({
                     type: "CLEAR_DRAFTS",
                  });
                  navigate("/new-course");
               }}
               className="settings-panel__plus-icon"
               src={plusIcon}>
               Новый курс
            </Button>
         </div>
         <div className="courses-wrapper"> { publishedCourses.map((course) => (
               <CourseItem
                  courseName={course.name}
                  courseStatus={course.shared}
                  courseInfo="Короткая информация о курсе"
                  courseTheme={
                     course.posts.length === 1
                        ? "1 тема"
                        : `${course.posts.length} тем`
                  }
                  coursePrice={course.cost}
                  onClick={() => {
                     dispatch({
                        type: "SAVE_DRAFT_COURSE",
                        payload: {
                           author: course.author,
                           id: course.id,
                           name: course.name,
                           cost: course.cost,
                           nativeLanguageId: course.nativeLanguage.id - 1,
                           foreignLanguageId: course.foreignLanguage.id - 1,
                           shared: course.shared,
                           topics: course.posts,
                           current: course,
                        },
                     });
                     navigate(`/course/${course.id}`);
                  }}
                  key={course.id}
               />
         )) }
         </div>
         <Pagination />
      </div>
   );
};

const mapStateToProps = (state) => {
   const { courses } = state;

   return {
      publishedCoursesCount: courses.publishedCoursesCount,
      draftCoursesCount: courses.draftCoursesCount,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getCoursesAsync: () => dispatch(getCoursesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
