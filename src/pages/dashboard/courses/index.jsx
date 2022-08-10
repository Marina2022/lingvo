import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS

import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";

import "./index.scss";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CourseItem from "./course-item";
import { deleteCourseAsync, getCoursesAsync } from "../../../redux/courses/courses.actions";
import { t } from "i18next";
import { BuildBreadcrumbs } from "../layout/breadcrumbs";
import useInput from "../../../effects/useInput.effect";
import { Grid } from "@mui/material";
import { Home } from "@mui/icons-material";

/**
 * 
 * @param {{dispatchGetCoursesAsync:Function, dispatchDeleteCourseAsync:Function}} param0 
 * @returns 
 */
const CoursesBody = ({ dispatchGetCoursesAsync, dispatchDeleteCourseAsync }) => {


   useEffect( () => { dispatchGetCoursesAsync(); },  [dispatchGetCoursesAsync] );   
   
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
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
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
            <Button 
               variant='contained'
               src={<AddOutlinedIcon/>}
               onClick={() => { 
                  dispatch({ type: "CLEAR_DRAFTS", });
                  navigate("new");
               }}                        
            >
               {t("actions.create")}
            </Button>
         </Grid>
         <Grid item xs={12} sx={{ paddingTop: '2rem !important'}} container spacing={2} justifyContent="center">
         { 
            publishedCourses
               .filter(course => !inputState.search || Object.values(course).join("|").toLowerCase().includes(inputState.search.toLowerCase()))
               .map(course => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xxl={2} key={course.id}>
                     <CourseItem
                        courseName={course.name}
                        courseStatus={course.shared}
                        courseInfo={t("courses.summary")}
                        courseTrainings={t("trainings.number_of", {count: course.posts.length})}
                        coursePrice={t("courses.course.cost", {count: JSON.parse(course.cost)})}
                        onOpen={() => navigate(`${course.id}`)}
                        onDelete={() => { window.confirm(t("messages.confirm.deleteItem")) && dispatchDeleteCourseAsync(course.id) }}
                     />
                  </Grid>
               )) 
         }
         </Grid>
      </Grid>
   </>
}


const CoursesPage = (props) => { 
      
   const [crumbs, setCrumbs] = useState([{ key: 0, name: t("courses.title"), path: "courses", icon: <Home /> }]);
   
   const outlet = useOutlet()

   useEffect(() => {
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (!outlet) {
         setCrumbs([{ key: 0, name: t("courses.title"), path: "courses", icon: <Home /> }])
      }
   }
   , [outlet])
   
   return (      
      <Grid container spacing={2} sx={{ justifyContent: 'center', alignContent: 'flex-start', padding: '2rem 1rem', flexGrow:undefined, flexBasis:undefined }}>
         <Grid item xs={12} sm={9}>
            <BuildBreadcrumbs crumbs={crumbs} />
         </Grid>
         <Grid item xs={12} sm={9}>
         {
            outlet ?
            <Outlet context={[crumbs, setCrumbs, 0]} /> :
            <>               
               <CoursesBody {...props}/>
            </>
         }
         </Grid>
      </Grid>
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
   dispatchGetCoursesAsync: () => dispatch(getCoursesAsync()),
   dispatchDeleteCourseAsync: (courseId) => dispatch(deleteCourseAsync(courseId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
