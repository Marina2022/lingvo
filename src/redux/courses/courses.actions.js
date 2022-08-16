import { coursesActionTypes } from "./courses.types";
import coursesApi from "./courses.api";

import handleAJAXError from "../../utilities/handleAJAXError.utility";

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
// const getCoursesFailure = (error) => ({
//    type: coursesActionTypes.GET_COURSES_FAILURE,
//    payload: error,
// });
//
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
      // console.log("courses", courses);
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
      console.error('error:', error);
      const message = handleAJAXError(error);
      dispatch(getCoursesSuccess(message));
      window.alert(message)
   }
};

//CREATE TOPIC ASYNC
/**
 * 
 * @param {Object} formParams 
 * @param {Function} callback 
 * @returns 
 */
export const createCourseAsync = (formParams, callback) => async (dispatch) => {
   dispatch(createCourseStart());
   // const tags = formParams.tags.map((item) => {
   //    return { name: item };
   // });
   const params = {
      ...formParams,
      // createdDate: "2021-02-18T05:10:14.065Z",
      // published: "2021-02-18T05:10:14.065Z",
      // tags: [],
   };

   try {
      const resp = await coursesApi.createCourse(params);
      dispatch(createCourseSuccess({ ...resp.data }));
      dispatch(getCoursesAsync());
      callback && callback(resp?.data?.id)
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(createCourseFailure(message));
      window.alert(message)
   }
};

// GET COURSE BY ID

const getCourseStart = () => ({
   type: coursesActionTypes.GET_COURSE_START,
})

const getCourseSuccess = (data) => ({
   type: coursesActionTypes.GET_COURSE_SUCCESS,
   payload: data
})

const getCourseFailure = (message) => ({
   type: coursesActionTypes.GET_COURSE_FAILURE,
   payload: message
})

/**
 * 
 * @param {Number} id 
 * @returns 
 */
export const getCourseAsync = (id) => async (dispatch) => {
   await dispatch(getCourseStart())

   try {
      const response = await coursesApi.getCourse(id)
      dispatch(getCourseSuccess(response.data))
   } catch (error) {
      const message = handleAJAXError(error)
      dispatch(getCourseFailure(message))
      window.alert(message)
   }
}

// UPDATE COURSE BY ID

const editCourseStart = () => ({
   type: coursesActionTypes.EDIT_COURSE_START,
})

const editCourseSuccess = (data) => ({
   type: coursesActionTypes.EDIT_COURSE_SUCCESS,
   payload: data
})

const editCourseFailure = (message) => ({
   type: coursesActionTypes.EDIT_COURSE_FAILURE,
   payload: message
})

/**
 * 
 * @param {Number} id 
 * @param {Object} formParams 
 * @param {Function} callback 
 * @returns 
 */
export const editCourseAsync = (id, formParams, callback) => async (dispatch) => {
   await dispatch(editCourseStart())

   try {
      const {posts: _, ...otherProps} = formParams
      const response = await coursesApi.editCourse(id, otherProps)
      if (formParams.posts?.length > 0) {
         await dispatch(updatePostsAsync(id, formParams.posts, callback))
         dispatch(editCourseSuccess(response.data))
      } else {
         dispatch(editCourseSuccess(response.data))
         callback && callback()
      }
   } catch (error) {
      const message = handleAJAXError(error)
      dispatch(editCourseFailure(message))
      window.alert(message)
   }
}

// UPDATE COURSE POSTS

const updatePostStart = () => ({
   type: coursesActionTypes.UPDATE_COURSE_POSTS_START,
})

const updatePostSuccess = (data) => ({
   type: coursesActionTypes.UPDATE_COURSE_POSTS_SUCCESS,
   payload: data
})

const updatePostsFailure = (message) => ({
   type: coursesActionTypes.UPDATE_COURSE_POSTS_FAILURE,
   payload: message
})

/**
 * 
 * @param {Number} id 
 * @param {Array<Object>} posts 
 * @param {Function} callback 
 * @returns 
 */
export const updatePostsAsync = (id, posts, callback) => async (dispatch) => {
   await dispatch(updatePostStart())

   try {
      const response = await coursesApi.updatePosts(id, posts.map(post => post.id))
      dispatch(updatePostSuccess(response.data))
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error)
      dispatch(updatePostsFailure(message))
      window.alert(message)
   }
}

// DELETE COURSE BY ID

const deleteCourseStart = () => ({
   type: coursesActionTypes.DELETE_COURSE_START,
})

const deleteCourseSuccess = (data) => ({
   type: coursesActionTypes.DELETE_COURSE_SUCCESS,
   payload: data
})

const deleteCourseFailure = (message) => ({
   type: coursesActionTypes.DELETE_COURSE_FAILURE,
   payload: message
})

/**
 * 
 * @param {Number} id 
 * @returns 
 */
export const deleteCourseAsync = (id, callback) => async (dispatch) => {
   await dispatch(deleteCourseStart())

   try {
      const response = await coursesApi.deleteCourse(id)
      dispatch(deleteCourseSuccess(response.data))
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error)
      dispatch(deleteCourseFailure(message))
      window.alert(message)
   }
}

// PUBLISH COURSE BY ID

const publishCourseStart = () => ({
   type: coursesActionTypes.PUBLISH_COURSE_START,
})

const publishCourseSuccess = (data) => ({
   type: coursesActionTypes.PUBLISH_COURSE_SUCCESS,
   payload: data
})

const publishCourseFailure = (message) => ({
   type: coursesActionTypes.PUBLISH_COURSE_FAILURE,
   payload: message
})

/**
 * 
 * @param {Number} id 
 * @param {Function} callback
 * @returns 
 */
export const publishCourseAsync = (id, callback) => async (dispatch) => {
   await dispatch(publishCourseStart())

   try {
      const response = await coursesApi.publishCourse(id)
      dispatch(publishCourseSuccess(response.data))
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error)
      dispatch(publishCourseFailure(message))
      window.alert(message)
   }
}