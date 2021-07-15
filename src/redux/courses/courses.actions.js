import { coursesActionTypes } from "./courses.types";
import coursesApi from "./courses.api";

import handleAJAXError from "../../utilities/handleAJAXError.utility";
import { topicsActionTypes } from "../topics/topics.types";
import topicsApi from "../topics/topics.api";

//ACTIONS FOR GETTING COURSES
const getCoursesStart = () => ({
   type: coursesActionTypes.GET_COURSES_START,
});
const getCoursesSuccess = (
   publishedCourses,
   draftCourses,
   publishedCoursesCount,
   draftCoursesCount
) => ({
   type: coursesActionTypes.GET_COURSES_SUCCESS,
   publishedCourses,
   draftCourses,
   publishedCoursesCount,
   draftCoursesCount,
});
const getCoursesFailure = (error) => ({
   type: coursesActionTypes.GET_COURSES_FAILURE,
   payload: error,
});

//ACTIONS FOR CREATING A COURSE
const createCourseStart = () => ({
   type: coursesActionTypes.CREATE_COURSE_START,
});
const createCourseSuccess = (data) => ({
   type: coursesActionTypes.CREATE_COURSE_SUCCESS,
   payload: data,
});
const createCourseFailure = (error) => ({
   type: coursesActionTypes.CREATE_COURSE_SUCCESS,
   payload: error,
});

//GET TOPICS ASYNC
export const getCoursesAsync = () => async (dispatch) => {
   dispatch(getCoursesStart());

   try {
      const resp = await coursesApi.getCourses();
      const courses = resp.data;
      console.log("courses");
      const publishedCourses = courses.filter(
         (course) => course?.published !== null
      );
      const draftCourses = courses.filter(
         (course) => course?.published === null
      );

      dispatch(
         getCoursesSuccess(
            publishedCourses,
            draftCourses,
            publishedCourses.length,
            draftCourses.length
         )
      );
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getCoursesSuccess(message));
   }
};
