import { profileActionTypes } from "./profile.types";
import profileApi from "./profile.api";
import handleAJAXError from "../../utilities/handleAJAXError.utility";

//ACTIONS FOR GETTING USER INFO
const getUserInfoStart = () => ({
   type: profileActionTypes.GET_CURRENT_USER_INFO_START,
});
const getUserInfoSuccess = (userData) => ({
   type: profileActionTypes.GET_CURRENT_USER_INFO_SUCCESS,
   payload: userData,
});
const getUserInfoFailure = (error) => ({
   type: profileActionTypes.GET_CURRENT_USER_INFO_FAILURE,
   payload: error,
});

//ACTIONS FOR EDITING AVATAR
const editAvatarStart = () => ({
   type: profileActionTypes.EDIT_AVATAR_START,
});
const editAvatarSuccess = (avatarResponse) => ({
   type: profileActionTypes.EDIT_AVATAR_SUCCESS,
   payload: avatarResponse,
});
const editAvatarFailure = (error) => ({
   type: profileActionTypes.EDIT_AVATAR_FAILURE,
   payload: error,
});

//ACTIONS FOR UPDATING USER DATA
const updateUserStart = () => ({
   type: profileActionTypes.UPDATE_USER_START,
});
const updateUserSuccess = (userUpdateResponse) => ({
   type: profileActionTypes.UPDATE_USER_SUCCESS,
   payload: userUpdateResponse,
});
const updateUserFailure = (error) => ({
   type: profileActionTypes.UPDATE_USER_FAILURE,
   payload: error,
});

//ACTIONS FOR UPDATING SOCIAL NETWORK LINK
const updateLinkStart = () => ({
   type: profileActionTypes.UPDATE_LINK_START,
});
const updateLinkSuccess = (updateLinkResponse) => ({
   type: profileActionTypes.UPDATE_LINK_SUCCESS,
   payload: updateLinkResponse,
});
const updateLinkFailure = (error) => ({
   type: profileActionTypes.UPDATE_LINK_FAILURE,
   payload: error,
});

//ACTIONS FOR SUBSCRIBING LINK
const subscribeLinkStart = () => ({
   type: profileActionTypes.SUBSCRIBE_LINK_START,
});
const subscribeLinkSuccess = (appLink) => ({
   type: profileActionTypes.SUBSCRIBE_LINK_SUCCESS,
   payload: appLink,
});
const subscribeLinkFailure = (error) => ({
   type: profileActionTypes.SUBSCRIBE_LINK_FAILURE,
   payload: error,
});

//GET USER INFO ASYNC
export const getUserInfoAsync = () => async (dispatch) => {
   dispatch(getUserInfoStart());

   try {
      const resp = await profileApi.getCurrentUser();

      dispatch(getUserInfoSuccess({ ...resp.data }));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(getUserInfoFailure(message));
      window.alert(message)
   }
};

//EDIT AVATAR ASYNC
export const editAvatarAsync = (params) => async (dispatch) => {
   dispatch(editAvatarStart());

   try {
      const resp = await profileApi.editAvatar(params);

      dispatch(editAvatarSuccess(resp.data));
      dispatch(getUserInfoAsync());
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(editAvatarFailure(message));
      window.alert(message)
   }
};

//UPDATE USER ASYNC
export const updateUserAsync = (params) => async (dispatch) => {
   dispatch(updateUserStart());

   try {
      const resp = await profileApi.updateUserData(params);

      dispatch(updateUserSuccess(resp.data));
      dispatch(getUserInfoAsync());
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(updateUserFailure(message));
      window.alert(message)
   }
};

//UPDATE SOCIAL NETWORK LINK ASYNC
export const updateLinkAsync = (params) => async (dispatch) => {
   dispatch(updateLinkStart());

   try {
      const resp = await profileApi.updateLink(params);

      dispatch(updateLinkSuccess(resp.data));
      dispatch(getUserInfoAsync());
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(updateLinkFailure(message));
      window.alert(message)
   }
};

//SUBSCRIBE LINK ASYNC
export const subscribeLinkAsync = (params) => async (dispatch) => {
   dispatch(subscribeLinkStart());

   try {
      const resp = await profileApi.subscribeLink(params);

      dispatch(subscribeLinkSuccess(resp?.data?.link));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(subscribeLinkFailure(message));
      window.alert(message)
   }
};
