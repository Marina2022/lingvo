import { profileActionTypes } from "./profile.types";

const INITIAL_STATE = {
   //CURRENT USER INFO
   currentUserInfo: null,
   errorMessage: null,
   isUserLoading: false,
   //AVATAR PARAMS
   editAvatarResponse: null,
   editAvatarLoading: false,
   editAvatarMessage: "",
   //AVATAR PARAMS
   updateUserResponse: null,
   updateUserLoading: false,
   updateUserMessage: "",
   //LINKS PARAMS
   updateLinkResponse: null,
   updateLinkLoading: false,
   updateLinkMessage: "",
   //SUBSCRIBE LINK PARAMS
   appLink: null,
   subscribeLinkLoading: false,
   subscribeLinkMessage: "",
};

const profileReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      //! GET CURRENT USER INFO
      case profileActionTypes.GET_CURRENT_USER_INFO_START:
         return { ...state, isUserLoading: true };
      case profileActionTypes.GET_CURRENT_USER_INFO_SUCCESS:
         return {
            ...state,
            isUserLoading: false,
            currentUserInfo: action.payload,
         };
      case profileActionTypes.GET_CURRENT_USER_INFO_FAILURE:
         return {
            ...state,
            isUserLoading: false,
            errorMessage: action.payload,
         };
      //! EDIT AVATAR
      case profileActionTypes.EDIT_AVATAR_START:
         return { ...state, editAvatarLoading: true };
      case profileActionTypes.EDIT_AVATAR_SUCCESS:
         return {
            ...state,
            editAvatarLoading: false,
            editAvatarResponse: action.payload,
         };
      case profileActionTypes.EDIT_AVATAR_FAILURE:
         return {
            ...state,
            editAvatarLoading: false,
            editAvatarMessage: action.payload,
         };
      //! UPDATE USER
      case profileActionTypes.UPDATE_USER_START:
         return { ...state, updateUserLoading: true };
      case profileActionTypes.UPDATE_USER_SUCCESS:
         return {
            ...state,
            updateUserLoading: false,
            updateUserResponse: action.payload,
         };
      case profileActionTypes.UPDATE_USER_FAILURE:
         return {
            ...state,
            updateUserLoading: false,
            updateUserMessage: action.payload,
         };
      //! UPDATE LINK
      case profileActionTypes.UPDATE_LINK_START:
         return { ...state, updateLinkLoading: true };
      case profileActionTypes.UPDATE_LINK_SUCCESS:
         return {
            ...state,
            updateLinkLoading: false,
            updateLinkResponse: action.payload,
         };
      case profileActionTypes.UPDATE_LINK_FAILURE:
         return {
            ...state,
            updateLinkLoading: false,
            updateLinkMessage: action.payload,
         };
      //! SUBSCRIBE LINK
      case profileActionTypes.SUBSCRIBE_LINK_START:
         return { ...state, subscribeLinkLoading: true };
      case profileActionTypes.SUBSCRIBE_LINK_SUCCESS:
         return {
            ...state,
            subscribeLinkLoading: false,
            appLink: action.payload,
         };
      case profileActionTypes.SUBSCRIBE_LINK_FAILURE:
         return {
            ...state,
            subscribeLinkLoading: false,
            subscribeLinkMessage: action.payload,
         };
      default:
         return state;
   }
};

export default profileReducer;
