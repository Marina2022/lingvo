import axios from "axios";

const coursesApi = {
   getCourses: () => axios.get("courses", {}),
   /**
    * 
    * @param {Number} courseId 
    * @returns 
    */
   getCourse: (courseId) => axios.get(`courses/${courseId}`),
   createCourse: (params) => axios.post("courses", { ...params }),
   /**
    * 
    * @param {Number} courseId 
    * @param {Object} data 
    * @returns 
    */
   editCourse: (courseId, data) => axios.put(`courses/${courseId}`, { ...data }),
   /**
    * 
    * @param {Number} courseId 
    * @param {Array<Number>} postIds 
    * @returns 
    */
   updatePosts: (courseId, postIds) => axios.put(`courses/${courseId}/post?${postIds.map(postId => `postIds=${postId}`).join('&')}`),
    /**
    * 
    * @param {Number} courseId 
    * @returns 
    */
   deleteCourse: (courseId) => axios.delete(`courses/${courseId}`),
   /**
    * 
    * @param {Number} courseId 
    * @returns 
    */
   publishCourse: (courseId) => axios.put(`courses/${courseId}/publish`),
};
export default coursesApi;
