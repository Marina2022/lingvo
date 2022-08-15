import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS

import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CourseItem from "./course-item";
import { deleteCourseAsync, getCoursesAsync } from "../../../redux/courses/courses.actions";
import { t } from "i18next";
import useInput from "../../../effects/useInput.effect";
import { Grid } from "@mui/material";
import { Home } from "@mui/icons-material";
import { compareObjects, toDigestString } from "../../../utilities/helper-functions";

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
      event.target.value = event.target.value.toLowerCase()
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
               .filter(course => !inputState.search || toDigestString(course).includes(inputState.search))
               .map(course => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xxl={2} key={course.id}>
                     <CourseItem
                        courseName={course.name}
                        courseStatus={course.shared}
                        courseInfo={t("courses.summary")}
                        courseTrainings={t("trainings.number_of", {count: course.posts.length})}
                        courseTags={course.tags}
                        coursePrice={t("courses.course.cost", {count: JSON.parse(course.cost)})}
                        setFilter={({name}) => handleInputChange({target:{name:'search',value:name}})}
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


const CoursesPage = ({
   crumbsProps:[crumbs, setCrumbs],
   ...otherProps
}) => { 
      
   const outlet = useOutlet()
   
   useEffect(() => {
      const initCrumb = { key: 0, name: t("courses.title"), path: "courses", icon: <Home /> }
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (crumbs.length === 0 || !compareObjects(crumbs[0], initCrumb)) {
         setCrumbs([initCrumb])
      }
   }
   , [crumbs, setCrumbs])
   
   return (      
      outlet ?
      <Outlet context={[crumbs, setCrumbs, 0]} /> :
      <>               
         <CoursesBody {...otherProps}/>
      </>
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
