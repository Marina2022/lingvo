import { topicsActionTypes } from "./topics.types";

const INITIAL_STATE = {
   //GET TOPICS PARAMS
   publishedTopics: [],
   draftTopics: [],
   publishedTopicsCount: null,
   draftTopicsCount: null,
   errorMessage: null,
   isTopicsLoading: false,
   //CREATE TOPICS PARAMS
   responseData: null,
   isTopicCreatedLoading: false,
   topicCreatedMessage: "",
   //SELECTED TOPIC FOR DELETING OR EDITING
   selectedTopic: null,
   //SINGLE TOPIC PARAMS
   singleTopicData: null,
   isSingleTopicLoading: false,
   singleTopicMessage: "",
   //EDIT TOPIC PARAMS
   editResponse: null,
   isTopicEditing: false,
   editMessage: "",
   //PUBLISH TOPIC PARAMS
   publishResponse: null,
   publishTopicLoading: false,
   publishTopicMessage: "",
};

const topicsReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      //! GET TOPICS
      case topicsActionTypes.GET_TOPICS_START:
         return { ...state, isTopicsLoading: true };
      case topicsActionTypes.GET_TOPICS_SUCCESS:
         return {
            ...state,
            isTopicsLoading: false,
            publishedTopics: action.publishedTopics,
            draftTopics: action.draftTopics,
            publishedTopicsCount: action.publishedTopicsCount,
            draftTopicsCount: action.draftTopicsCount,
         };
      case topicsActionTypes.GET_TOPICS_FAILURE:
         return {
            ...state,
            isTopicsLoading: false,
            errorMessage: action.payload,
         };
      //! CREATE TOPICS
      case topicsActionTypes.CREATE_TOPIC_START:
         return { ...state, isTopicCreatedLoading: true };
      case topicsActionTypes.CREATE_TOPIC_SUCCESS:
         return {
            ...state,
            isTopicCreatedLoading: false,
            responseData: action.payload,
         };
      case topicsActionTypes.CREATE_TOPIC_FAILURE:
         return {
            ...state,
            isTopicCreatedLoading: false,
            topicCreatedMessage: action.payload,
         };
      //SET SELECTED TOPIC
      case topicsActionTypes.SET_SELECTED_TOPIC:
         return {
            ...state,
            selectedTopic: action.payload,
         };
      //! GET SINGLE TOPIC
      case topicsActionTypes.GET_SINGLE_TOPIC_START:
         return { ...state, isSingleTopicLoading: true };
      case topicsActionTypes.GET_SINGLE_TOPIC_SUCCESS:
         return {
            ...state,
            isSingleTopicLoading: false,
            singleTopicData: action.payload,
         };
      case topicsActionTypes.GET_SINGLE_TOPIC_FAILURE:
         return {
            ...state,
            isTopicCreatedLoading: false,
            singleTopicMessage: action.payload,
         };
      //! EDIT TOPIC
      case topicsActionTypes.EDIT_TOPIC_START:
         return { ...state, isTopicEditing: true };
      case topicsActionTypes.EDIT_TOPIC_SUCCESS:
         return {
            ...state,
            isTopicEditing: false,
            editResponse: action.payload,
         };
      case topicsActionTypes.EDIT_TOPIC_FAILURE:
         return {
            ...state,
            isTopicEditing: false,
            editMessage: action.payload,
         };
      //! PUBLISH TOPIC
      case topicsActionTypes.PUBLISH_TOPIC_START:
         return { ...state, publishTopicLoading: true };
      case topicsActionTypes.PUBLISH_TOPIC_SUCCESS:
         return {
            ...state,
            publishTopicLoading: false,
            publishResponse: action.payload,
         };
      case topicsActionTypes.PUBLISH_TOPIC_FAILURE:
         return {
            ...state,
            publishTopicLoading: false,
            publishTopicMessage: action.payload,
         };
      default:
         return state;
   }
};

export default topicsReducer;
