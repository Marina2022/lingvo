import { unitsActionTypes } from "./units.types";
import unitsApi from "./units.api";
import handleAJAXError from "../../utilities/handleAJAXError.utility";
import { getSingleTopicAsync } from "../../redux/topics/topics.actions";

// ACTION FOR SETTING SELECTED UNIT
export const setSelectedUnit = (unit) => ({
   type: unitsActionTypes.SET_SELECTED_UNIT,
   payload: unit,
});

//ACTIONS FOR GETTING SINGLE UNIT
const getSingleUnitStart = () => ({
   type: unitsActionTypes.GET_SINGLE_UNIT_START,
});
const getSingleUnitSuccess = (unit) => ({
   type: unitsActionTypes.GET_SINGLE_UNIT_SUCCESS,
   payload: unit,
});
const getSingleUnitFailure = (message) => ({
   type: unitsActionTypes.GET_SINGLE_UNIT_FAILURE,
   payload: message,
});

//ACTIONS FOR CREATING A UNIT
const createUnitStart = () => ({
   type: unitsActionTypes.CREATE_UNIT_START,
});
const createUnitSuccess = (response) => ({
   type: unitsActionTypes.CREATE_UNIT_SUCCESS,
   payload: response,
});
const createUnitFailure = (message) => ({
   type: unitsActionTypes.CREATE_UNIT_FAILURE,
   payload: message,
});

//ACTIONS FOR EDITING SINGLE UNIT
const editUnitStart = () => ({
   type: unitsActionTypes.EDIT_UNIT_START,
});
const editUnitSuccess = (unit) => ({
   type: unitsActionTypes.EDIT_UNIT_SUCCESS,
   payload: unit,
});
const editUnitFailure = (message) => ({
   type: unitsActionTypes.EDIT_UNIT_FAILURE,
   payload: message,
});

//ACTIONS FOR DELETING UNIT
const deleteUnitStart = () => ({
   type: unitsActionTypes.DELETE_UNIT_START,
});
const deleteUnitSuccess = (response) => ({
   type: unitsActionTypes.DELETE_UNIT_SUCCESS,
   payload: response,
});
const deleteUnitFailure = (message) => ({
   type: unitsActionTypes.DELETE_UNIT_FAILURE,
   payload: message,
});

//ACTIONS FOR ADDING UNIT VOICE
const addVoiceStart = () => ({
   type: unitsActionTypes.ADD_VOICE_START,
});
const addVoiceSuccess = (response) => ({
   type: unitsActionTypes.ADD_VOICE_SUCCESS,
   payload: response,
});
const addVoiceFailure = (message) => ({
   type: unitsActionTypes.ADD_VOICE_FAILURE,
   payload: message,
});

//ACTIONS FOR DELETING UNIT VOICE
const deleteVoiceStart = () => ({
   type: unitsActionTypes.DELETE_VOICE_START,
});
const deleteVoiceSuccess = (response) => ({
   type: unitsActionTypes.DELETE_VOICE_SUCCESS,
   payload: response,
});
const deleteVoiceFailure = (message) => ({
   type: unitsActionTypes.DELETE_VOICE_FAILURE,
   payload: message,
});

// GET SINGLE UNIT ASYNC
export const getSingleUnitAsync = (unitID) => async (dispatch) => {
   dispatch(getSingleUnitStart());

   try {
      const response = await unitsApi.getSingleUnit(unitID);
      dispatch(getSingleUnitSuccess(response.data));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getSingleUnitFailure(message));
   }
};

// CREATE UNIT ASYNC
export const createUnitAsync = (
   topicID,
   formParams,
   navigate,
   voiceParams,
   prevVoiceId
) => async (dispatch) => {
   dispatch(createUnitStart());
   const tags = formParams.tags.map((item) => {
      return { name: item };
   });
   const params = {
      ...formParams,
      tags,
   };

   try {
      const response = await unitsApi.createUnit(topicID, params);
      dispatch(createUnitSuccess(response.data));
      dispatch(
         addVoiceAsync(
            response?.data?.id,
            topicID,
            voiceParams,
            navigate,
            prevVoiceId
         )
      );
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(createUnitFailure(message));
   }
};

// EDIT UNIT ASYNC
export const editUnitAsync = (
   unitID,
   formParams,
   navigate,
   topicID,
   isTagsUpdated,
   voiceParams,
   prevVoiceId
) => async (dispatch) => {
   dispatch(editUnitStart());

   const tags = isTagsUpdated
      ? formParams.tags.map((item) => {
           return { name: item };
        })
      : formParams.tags;

   const params = {
      ...formParams,
      tags,
   };

   try {
      const response = await unitsApi.editUnit(unitID, params);
      dispatch(editUnitSuccess(response.data));
      dispatch(
         addVoiceAsync(unitID, topicID, voiceParams, navigate, prevVoiceId)
      );
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(editUnitFailure(message));
   }
};

// DELETE UNIT ASYNC
export const deleteUnitAsync = (unitID, topicID) => async (dispatch) => {
   dispatch(deleteUnitStart());

   try {
      const response = await unitsApi.deleteUnit(unitID);
      dispatch(deleteUnitSuccess(response.data));
      dispatch(getSingleTopicAsync(topicID));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(deleteUnitFailure(message));
   }
};

// ADD UNIT VOICE ASYINC
export const addVoiceAsync = (
   unitID,
   topicID,
   params,
   navigate,
   prevVoiceID
) => async (dispatch) => {
   dispatch(addVoiceStart());

   try {
      const response = await unitsApi.addVoice(unitID, params);
      dispatch(addVoiceSuccess(response.data));
      dispatch(deletePrevVoiceAsync(prevVoiceID, topicID));
      if (typeof navigate === 'function') {
         navigate()
      } else {
         navigate(`/topics/${topicID}/units/${unitID}`);
      }
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(addVoiceFailure(message));
   }
};

// DELETE UNIT VOICE ASYINC
export const deletePrevVoiceAsync = (voiceID, topicID) => async (dispatch) => {
   dispatch(deleteVoiceStart());

   try {
      const response = await unitsApi.deleteVoice(voiceID);
      dispatch(deleteVoiceSuccess(response.data));
      dispatch(getSingleTopicAsync(topicID));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(deleteVoiceFailure(message));
   }
};
