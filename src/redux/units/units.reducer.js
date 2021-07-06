import { unitsActionTypes } from "./units.types";

const INITIAL_STATE = {
   // SELECTED UNIT
   selectedUnit: null,
   //SINGLE UNIT PARAMS
   singleUnit: null,
   singleUnitLoading: false,
   singleUnitMessage: "",
   //CREATE UNIT PARAMS
   unitCreateResponse: null,
   unitCreateLoading: false,
   unitCreateMessage: "",
   //EDIT UNIT PARAMS
   unitEditResponse: null,
   unitEditLoading: false,
   unitEditMessage: "",
   //DELETE UNIT PARAMS
   unitdeleteResponse: null,
   unitDeleteLoading: false,
   unitDeleteMessage: "",
   //ADD UNIT VOICE
   voiceResponse: null,
   voiceAddLoading: false,
   voiceAddMessage: "",
   //REMOVE UNIT VOICE
   deleteVoiceResponse: null,
   deleteVoiceLoading: false,
   deleteVoiceMessage: "",
};

const unitsReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      //SET SELECTED UNIT
      case unitsActionTypes.SET_SELECTED_UNIT:
         return { ...state, selectedUnit: action.payload };
      //! GET SINGLE UNIT
      case unitsActionTypes.GET_SINGLE_UNIT_START:
         return { ...state, singleUnitLoading: true };
      case unitsActionTypes.GET_SINGLE_UNIT_SUCCESS:
         return {
            ...state,
            singleUnitLoading: false,
            singleUnit: action.payload,
         };
      case unitsActionTypes.GET_SINGLE_UNIT_FAILURE:
         return {
            ...state,
            singleUnitLoading: false,
            singleUnitMessage: action.payload,
         };
      //! CREATE UNIT
      case unitsActionTypes.CREATE_UNIT_START:
         return { ...state, unitCreateLoading: true };
      case unitsActionTypes.CREATE_UNIT_SUCCESS:
         return {
            ...state,
            unitCreateLoading: false,
            unitCreateResponse: action.payload,
         };
      case unitsActionTypes.CREATE_UNIT_FAILURE:
         return {
            ...state,
            unitCreateLoading: false,
            unitCreateMessage: action.payload,
         };
      //! EDIT UNIT
      case unitsActionTypes.EDIT_UNIT_START:
         return { ...state, unitEditLoading: true };
      case unitsActionTypes.EDIT_UNIT_SUCCESS:
         return {
            ...state,
            unitEditLoading: false,
            unitEditResponse: action.payload,
         };
      case unitsActionTypes.EDIT_UNIT_FAILURE:
         return {
            ...state,
            unitEditLoading: false,
            unitEditMessage: action.payload,
         };
      //! DELETE UNIT
      case unitsActionTypes.DELETE_UNIT_START:
         return { ...state, unitDeleteLoading: true };
      case unitsActionTypes.DELETE_UNIT_SUCCESS:
         return {
            ...state,
            unitDeleteLoading: false,
            unitdeleteResponse: action.payload,
         };
      case unitsActionTypes.DELETE_UNIT_FAILURE:
         return {
            ...state,
            unitDeleteLoading: false,
            unitDeleteMessage: action.payload,
         };
      //! ADD UNIT VOICE
      case unitsActionTypes.ADD_VOICE_START:
         return { ...state, voiceAddLoading: true };
      case unitsActionTypes.ADD_VOICE_SUCCESS:
         return {
            ...state,
            voiceAddLoading: false,
            voiceResponse: action.payload,
         };
      case unitsActionTypes.ADD_VOICE_FAILURE:
         return {
            ...state,
            voiceAddLoading: false,
            voiceAddMessage: action.payload,
         };
      //! DELETE UNIT VOICE
      case unitsActionTypes.DELETE_VOICE_START:
         return { ...state, deleteVoiceLoading: true };
      case unitsActionTypes.DELETE_VOICE_SUCCESS:
         return {
            ...state,
            deleteVoiceLoading: false,
            deleteVoiceResponse: action.payload,
         };
      case unitsActionTypes.DELETE_VOICE_FAILURE:
         return {
            ...state,
            deleteVoiceLoading: false,
            deleteVoiceMessage: action.payload,
         };
      default:
         return state;
   }
};

export default unitsReducer;
