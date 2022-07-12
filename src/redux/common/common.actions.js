import { commonActionTypes } from "./common.types";
import commonApi from "./common.api";
import handleAJAXError from "../../utilities/handleAJAXError.utility";

// ACTIONS FOR GETTING LANGUAGES LIST
const getLanguagesListStart = () => ({
   type: commonActionTypes.GET_LANGUAGES_LIST_START,
});
const getLanguagesListSuccess = (languages) => ({
   type: commonActionTypes.GET_LANGUAGES_LIST_SUCCESS,
   payload: languages,
});
const getLanguagesListFailure = (message) => ({
   type: commonActionTypes.GET_LANGUAGES_LIST_FAILURE,
   payload: message,
});

// ACTIONS FOR GETTING LANGUAGES LIST
const getLevelsListStart = () => ({
   type: commonActionTypes.GET_LEVELS_LIST_START,
});
const getLevelsListSuccess = (levels) => ({
   type: commonActionTypes.GET_LEVELS_LIST_SUCCESS,
   payload: levels,
});
const getLevelsListFailure = (message) => ({
   type: commonActionTypes.GET_LEVELS_LIST_FAILURE,
   payload: message,
});

// GET LANGUAGES LIST ASYNC
export const getLanguagesListAsync = () => async (dispatch) => {
   dispatch(getLanguagesListStart());

   try {
      const response = await commonApi.getLanguagesList();
      dispatch(getLanguagesListSuccess(response.data));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getLanguagesListFailure(message));
   }
};

// GET LEVELS LIST ASYNC
export const getLevelsListAsync = () => async (dispatch) => {
   dispatch(getLevelsListStart());

   try {
      const response = await commonApi.getLevelsList();
      dispatch(getLevelsListSuccess(response.data));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getLevelsListFailure(message));
   }
};
