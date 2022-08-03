import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS

import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";

import "./index.scss";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CourseItem from "./components/course-item";
import { getCoursesAsync } from "../../../redux/courses/courses.actions";
import { t } from "i18next";
import { BuildBreadcrumbs } from "../layout/breadcrumbs";
import useInput from "../../../effects/useInput.effect";
import { Grid } from "@mui/material";

const CoursesBody = (props) => {

   const { getCoursesAsync } = props;

   useEffect( () => { getCoursesAsync(); },  [getCoursesAsync] );   
   
   const { publishedCourses } = useSelector((state) => state.courses);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   const handleInputChange = (event) => {
      handleInput(event);
   };   

   return <>
      <div className="courses-page__heading-block">
         <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={8}>
               <Input name="search" 
                  type="text" 
                  placeholder={t("actions.search")} 
                  required 
                  value={inputState.search}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <div className="settings-panel">
                  <Button className="settings-panel__plus-icon"
                     src={<AddOutlinedIcon/>}
                     onClick={() => { 
                        dispatch({ type: "CLEAR_DRAFTS", });
                        navigate("/courses/new");
                     }}                        
                  >
                     {t("actions.create")}
                  </Button>
               </div>
            </Grid>
         </Grid>
      </div>
      <div className="courses-wrapper"> 
         <Grid container spacing={2} justifyContent="center">
         { 
            publishedCourses
               .filter(course => !inputState.search || Object.values(course).join("|").toLowerCase().includes(inputState.search.toLowerCase()))
               .map(course => (
                  <Grid item xs={10} sm={5} md={4} lg={3} xl={2} key={course.id} onClick={() => navigate(`${course.id}`)}>
                     <CourseItem
                        courseName={course.name}
                        courseStatus={course.shared}
                        courseInfo={t("courses.summary")}
                        courseTrainings={t("trainings.number_of", {count: course.posts.length})}
                        coursePrice={t("courses.course.cost", {count: JSON.parse(course.cost)})}
                        
                        // onClick={() => {
                        //    dispatch({
                        //       type: "SAVE_DRAFT_COURSE",
                        //       payload: {
                        //          author: course.author,
                        //          id: course.id,
                        //          name: course.name,
                        //          cost: course.cost,
                        //          nativeLanguageId: course.nativeLanguage.id - 1,
                        //          foreignLanguageId: course.foreignLanguage.id - 1,
                        //          shared: course.shared,
                        //          topics: course.posts,
                        //          current: course,
                        //       },
                        //    });
                        //    navigate(`${course.id}`);
                        // }}
                     />
                  </Grid>
               )) 
         }
         </Grid>
      </div>
   </>
}


const CoursesPage = (props) => { 
      
   const [crumbs, setCrumbs] = useState([{ key: 0, name: t("courses.title"), path: "courses" }]);
   
   const outlet = useOutlet()

   useEffect(() => {
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (!outlet) {
         setCrumbs([{ key: 0, name: t("courses.title"), path: "courses"}])
      }
   }
   , [outlet])
   
   return (      
      <div className="courses-page">
         <BuildBreadcrumbs crumbs={crumbs} />
         {
            outlet ?
            <Outlet context={[crumbs, setCrumbs, 0]} /> :
            <>               
               <CoursesBody {...props}/>
            </>
         }
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
