import {coursesActionTypes} from "./courses.types";

const INITIAL_STATE = {
    //GET COURSES PARAMS
    publishedCourses: [],
    draftCourses: [],
    publishedCoursesCount: null,
    draftCoursesCount: null,
    errorMessage: null,
    isCoursesLoading: false,
    //CREATE COURSES PARAMS
    responseData: null,
    isCoursesCreatedLoading: false,
    CoursesCreatedMessage: "",
}

const coursesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case coursesActionTypes.GET_COURSES_START:
            return {...state, isCoursesLoading: true}
        case coursesActionTypes.GET_COURSES_SUCCESS:
            return {
                ...state,
                isCoursesLoading: false,
                publishedCourses: action.publishedCourses,
                draftCourses: action.draftCourses,
                publishedCoursesCount: action.publishedCoursesCount,
                draftCoursesCount: action.draftCoursesCount
            };
        case coursesActionTypes.GET_COURSES_FAILURE:
            return {
                ...state,
                isCoursesLoading: false,
                errorMessage: action.payload,
            };
        //! CREATE COURSE
        case coursesActionTypes.CREATE_COURSE_START:
            return {...state, isCoursesCreatedLoading: true}
        case coursesActionTypes.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                isCoursesCreatedLoading: false,
                responseData: action.payload
            };
        case coursesActionTypes.CREATE_COURSE_FAILURE:
            return {
                ...state,
                isCoursesCreatedLoading: false,
                CoursesCreatedMessage: action.payload
            }
    }
}

export default coursesReducer;