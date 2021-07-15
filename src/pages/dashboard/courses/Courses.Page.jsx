import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import Tab from "components/tab/Tab.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";

import "./_courses.styles.scss";
import plusIcon from "../../../assets/images/topics/plus.png";
import CourseItem from "./components/CourseItem/CourseItem";
import Pagination from "./components/Pagination/Pagination";
const CoursesPage = () => {
   const history = useHistory();

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
               onClick={() => history.push("/new-course")}
               className="settings-panel__plus-icon"
               src={plusIcon}>
               Новый курс
            </Button>
         </div>
         <div className="courses-wrapper">
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
         </div>
         <Pagination />
      </div>
   );
};
export default CoursesPage;
