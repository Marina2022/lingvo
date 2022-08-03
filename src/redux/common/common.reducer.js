import { commonActionTypes } from "./common.types";

const INITIAL_STATE = {
   //LANGUAGES PARAMS
   languagesList: null,
   isLanguagesLoading: false,
   languagesMessage: "",
   //LEVELS PARAMS
   levelsList: null,
   isLevelsLoading: false,
   levelsMessage: "",
};

const commonReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      //! LANGUAGES LIST
      case commonActionTypes.GET_LANGUAGES_LIST_START:
         return { ...state, isLanguagesLoading: true };
      case commonActionTypes.GET_LANGUAGES_LIST_SUCCESS:
         return {
            ...state,
            isLanguagesLoading: false,
            languagesList: action.payload.foreign,
            nativeLanguagesList: action.payload.native,
         };
      case commonActionTypes.GET_LANGUAGES_LIST_FAILURE:
         return {
            ...state,
            isLanguagesLoading: false,
            languagesList: action.payload.foreign,
            nativeLanguagesList: action.payload.native,
         };
      //! LEVELS LIST
      case commonActionTypes.GET_LEVELS_LIST_START:
         return { ...state, isLevelsLoading: true };
      case commonActionTypes.GET_LEVELS_LIST_SUCCESS:
         return {
            ...state,
            isLevelsLoading: false,
            levelsList: action.payload,
         };
      case commonActionTypes.GET_LEVELS_LIST_FAILURE:
         return {
            ...state,
            isLevelsLoading: false,
            levelsMessage: action.payload,
         };
      default:
         return state;
   }
};

export default commonReducer;
