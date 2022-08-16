import { coursesActionTypes } from "./courses.types";

const INITIAL_STATE = {
   //GET COURSES PARAMS
   publishedCourses: [],
   draftCourses: [],
   publishedCoursesCount: null,
   draftCoursesCount: null,
   
   responseData: null,
   errorMessage: null,
   
   isCoursesLoading: false,
   isCourseCreatedLoading: false,
   
   courseData: null,
   isCourseLoading: false,

   isCoursesUpdatedLoading: false,
   isCoursesPublishedLoading: false,
   isCoursesDeletedLoading: false,

 };

const coursesReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case coursesActionTypes.GET_COURSES_START:
         return { ...state, isCoursesLoading: true };
      case coursesActionTypes.GET_COURSES_SUCCESS:
         return {
            ...state,
            isCoursesLoading: false,
            publishedCourses: action.publishedCourses,
            draftCourses: action.draftCourses,
            publishedCoursesCount: action.publishedCoursesCount,
            draftCoursesCount: action.draftCoursesCount,
         };
      case coursesActionTypes.GET_COURSES_FAILURE:
         return {
            ...state,
            isCoursesLoading: false,
            errorMessage: action.payload,
         };

      //! GET COURSE
      case coursesActionTypes.GET_COURSE_START: return { 
         ...state, 
         isCourseLoading: true 
      };
      case coursesActionTypes.GET_COURSE_SUCCESS: return {
         ...state,
         isCourseLoading: false,
         courseData: action.payload,
      };
      case coursesActionTypes.GET_COURSE_FAILURE: return {
         ...state,
         isCourseLoading: false,
         errorMessage: action.payload,
      };
      //! CREATE COURSE
      case coursesActionTypes.CREATE_COURSE_START: return { 
         ...state, 
         isCourseCreatedLoading: true 
      };
      case coursesActionTypes.CREATE_COURSE_SUCCESS: return {
         ...state,
         isCourseCreatedLoading: false,
         responseData: action.payload,
      };
      case coursesActionTypes.CREATE_COURSE_FAILURE: return {
         ...state,
         isCourseCreatedLoading: false,
         errorMessage: action.payload,
      };
      //! UPDATE COURSE
      case coursesActionTypes.EDIT_COURSE_START: return { 
         ...state, 
         isCoursesUpdatedLoading: true 
      };
      case coursesActionTypes.EDIT_COURSE_SUCCESS: return {
         ...state,
         isCoursesUpdatedLoading: false,
         responseData: action.payload,
      };
      case coursesActionTypes.EDIT_COURSE_FAILURE: return {
         ...state,
         isCoursesUpdatedLoading: false,
         errorMessage: action.payload,
      };
      //! UPDATE COURSE POSTS
      case coursesActionTypes.UPDATE_COURSE_POSTS_START: return { 
         ...state, 
         isCoursesUpdatedLoading: true 
      };
      case coursesActionTypes.UPDATE_COURSE_POSTS_SUCCESS: return {
         ...state,
         isCoursesUpdatedLoading: false,
         responseData: action.payload,
      };
      case coursesActionTypes.UPDATE_COURSE_POSTS_FAILURE: return {
         ...state,
         isCoursesUpdatedLoading: false,
         errorMessage: action.payload,
      };
      //! PUBLISH COURSE
      case coursesActionTypes.PUBLISH_COURSE_START: return { 
         ...state, 
         isCoursesPublishedLoading: true 
      };
      case coursesActionTypes.PUBLISH_COURSE_SUCCESS: return {
         ...state,
         isCoursesPublishedLoading: false,
         responseData: action.payload,
      };
      case coursesActionTypes.PUBLISH_COURSE_FAILURE: return {
         ...state,
         isCoursesPublishedLoading: false,
         errorMessage: action.payload,
      };
      //! DELETE COURSE
      case coursesActionTypes.DELETE_COURSE_START: return { 
         ...state, 
         isCoursesDeletedLoading: true 
      };
      case coursesActionTypes.DELETE_COURSE_SUCCESS: return {
         ...state,
         isCoursesDeletedLoading: false,
         responseData: action.payload,
      };
      case coursesActionTypes.DELETE_COURSE_FAILURE: return {
         ...state,
         isCoursesDeletedLoading: false,
         errorMessage: action.payload,
      };
       default:
         return state;
   }
};

export default coursesReducer;
