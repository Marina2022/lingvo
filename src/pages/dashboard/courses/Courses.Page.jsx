import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS

import Input from "components/input/Input.component";
import Button from "components/button/Button.component";

import "./_courses.styles.scss";
import plusIcon from "assets/images/topics/plus.png";
import CourseItem from "./components/CourseItem/CourseItem";
import Pagination from "./components/Pagination/Pagination";
import { getCoursesAsync } from "redux/courses/courses.actions";

const CoursesPage = (props) => {
   const { getCoursesAsync } = props;

   const { publishedCourses } = useSelector((state) => state.courses);
   const history = useHistory();
   const dispatch = useDispatch();
   useEffect(() => {
      getCoursesAsync();
   });
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
                  history.push("/new-course");
               }}
               className="settings-panel__plus-icon"
               src={plusIcon}>
               Новый курс
            </Button>
         </div>
         <div className="courses-wrapper">
            {/* <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 1"
               courseStatus={true}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            />
            <CourseItem
               courseName="Курс 2"
               courseStatus={false}
               courseInfo="Короткая информация о курсе"
               courseTheme="10 тем"
               coursePrice="1000"
            /> */}
            {publishedCourses.map((course) => (
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
                     history.push(`/course/${course.id}`);
                  }}
                  key={course.id}
               />
            ))}
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
