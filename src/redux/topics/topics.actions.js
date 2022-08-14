import { topicsActionTypes } from "./topics.types";
import topicsApi from "./topics.api";
import handleAJAXError from "../../utilities/handleAJAXError.utility";

//ACTION FOR SELECTING SPECIFIC TOPIC
// export const setSelectedTopic = (topic) => ({
//    type: topicsActionTypes.SET_SELECTED_TOPIC,
//    payload: topic,
// });

//ACTIONS FOR GETTING TOPICS
const getTopicsStart = () => ({
   type: topicsActionTypes.GET_TOPICS_START,
});
const getTopicsSuccess = (
   publishedTopics,
   draftTopics,
   publishedTopicsCount,
   draftTopicsCount
) => ({
   type: topicsActionTypes.GET_TOPICS_SUCCESS,
   publishedTopics,
   draftTopics,
   publishedTopicsCount,
   draftTopicsCount,
});
const getTopicsFailure = (error) => ({
   type: topicsActionTypes.GET_TOPICS_FAILURE,
   payload: error,
});

//ACTIONS FOR CREATING A TOPIC
const createTopicStart = () => ({
   type: topicsActionTypes.CREATE_TOPIC_START,
});
const createTopicSuccess = (data) => ({
   type: topicsActionTypes.CREATE_TOPIC_SUCCESS,
   payload: data,
});
const createTopicFailure = (error) => ({
   type: topicsActionTypes.CREATE_TOPIC_FAILURE,
   payload: error,
});

//ACTIONS FOR DELETING A TOPIC
const deleteTopicStart = () => ({
   type: topicsActionTypes.DELETE_TOPIC_START,
});
const deleteTopicSuccess = () => ({
   type: topicsActionTypes.DELETE_TOPIC_SUCCESS,
});
const deleteTopicFailure = (error) => ({
   type: topicsActionTypes.DELETE_TOPIC_FAILURE,
   payload: error,
});

//ACTIONS FOR GETTING SPECIFIC TOPIC
const getSingleTopicStart = () => ({
   type: topicsActionTypes.GET_SINGLE_TOPIC_START,
});
const getSingleTopicSuccess = (topic) => ({
   type: topicsActionTypes.GET_SINGLE_TOPIC_SUCCESS,
   payload: topic,
});
const getSingleTopicFailure = (error) => ({
   type: topicsActionTypes.GET_SINGLE_TOPIC_FAILURE,
   payload: error,
});

//ACTIONS FOR EDITING A TOPIC
const editTopicStart = () => ({
   type: topicsActionTypes.EDIT_TOPIC_START,
});
const editTopicSuccess = (editResponse) => ({
   type: topicsActionTypes.EDIT_TOPIC_SUCCESS,
   payload: editResponse,
});
const editTopicFailure = (error) => ({
   type: topicsActionTypes.EDIT_TOPIC_FAILURE,
   payload: error,
});

//ACTIONS FOR PUBLISHING A TOPIC
const publishTopicStart = () => ({
   type: topicsActionTypes.PUBLISH_TOPIC_START,
});
const publishTopicSuccess = (publishResponse) => ({
   type: topicsActionTypes.PUBLISH_TOPIC_SUCCESS,
   payload: publishResponse,
});
const publishTopicFailure = (error) => ({
   type: topicsActionTypes.PUBLISH_TOPIC_FAILURE,
   payload: error,
});

//GET TOPICS ASYNC
export const getTopicsAsync = () => async (dispatch) => {
   dispatch(getTopicsStart());

   try {
      const resp = await topicsApi.getTopics();
      const topics = resp.data;

      const publishedTopics = topics.filter(
         (topic) => topic?.published !== null
      );
      const draftTopics = topics.filter((topic) => topic?.published === null);

      dispatch(
         getTopicsSuccess(
            publishedTopics,
            draftTopics,
            publishedTopics.length,
            draftTopics.length
         )
      );
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getTopicsFailure(message));
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
export const createTopicAsync = (formParams, callback) => async (dispatch) => {
   dispatch(createTopicStart());
   const params = {
      ...formParams,
      createdDate: null,
      published: null,
      samples: []
   };

   try {
      const resp = await topicsApi.createTopic(params);
      dispatch(createTopicSuccess({ ...resp.data }));
      dispatch(getTopicsAsync());
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(createTopicFailure(message));
      window.alert(message)
   }
};

//DELETE TOPIC ASYNC
export const deleteTopicAsync = (id) => async (dispatch) => {
   dispatch(deleteTopicStart());

   try {
      await topicsApi.deleteTopic(id);
      dispatch(deleteTopicSuccess());
      dispatch(getTopicsAsync());
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(deleteTopicFailure(message));
      window.alert(message)
   }
};

//GET SINGLE TOPIC ASYNC
export const getSingleTopicAsync = (id) => async (dispatch) => {
   await dispatch(getSingleTopicStart());

   try {
      const response = await topicsApi.getSingleTopics(id);
      dispatch(getSingleTopicSuccess(response.data));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getSingleTopicFailure(message));
      window.alert(message)
   }
};

//EDIT TOPIC ASYNC
/**
 * 
 * @param {Number} id 
 * @param {Object} formParams 
 * @param {Function} callback 
 * @returns 
 */
export const editTopicAsync = (id, formParams, callback) => async (dispatch) => {
   dispatch(editTopicStart());
   try {
      const response = await topicsApi.editTopic(id, {...formParams, author: undefined});

      dispatch(editTopicSuccess(response.data));
      dispatch(getTopicsAsync());
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(editTopicFailure(message));
      window.alert(message)
   }
};

// PUBLISH TOPIC ASYNC
/**
 * 
 * @param {Number} topicID 
 * @param {Function} callback 
 * @returns 
 */
export const publishTopicAsync = (topicID, callback) => async (dispatch) => {
   dispatch(publishTopicStart());

   try {
      const response = await topicsApi.publishTopic(topicID);
      dispatch(publishTopicSuccess(response.data));
      dispatch(getTopicsAsync());
      callback && callback()
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(publishTopicFailure(message));
      window.alert(message)
   }
};
