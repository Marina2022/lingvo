import { authActionTypes } from "./auth.types";
import authApi from "./auth.api.js";
import handleAJAXError from "../../utilities/handleAJAXError.utility";

//LOG OUT
export const userLogout = (errorMessage = "") => ({
   type: authActionTypes.USER_LOGOUT,
   payload: errorMessage,
});

//ACTIONS FOR LOGIN
const loginStart = () => ({
   type: authActionTypes.LOGIN_START,
});
const loginSuccess = (userData) => ({
   type: authActionTypes.LOGIN_SUCCESS,
   payload: userData,
});
const loginFailure = (error) => ({
   type: authActionTypes.LOGIN_FAILURE,
   payload: error,
});

//ACTIONS FOR REGISTRATION
const registerStart = () => ({
   type: authActionTypes.REGISTER_START,
});
const registerSuccess = (registerData) => ({
   type: authActionTypes.REGISTER_SUCCESS,
   payload: registerData,
});
const registerFailure = () => ({
   type: authActionTypes.REGISTER_FAILURE,
});

//ACTIONS FOR RESETTING PASSWORD
const resetPasswordStart = () => ({
   type: authActionTypes.RESET_PASSWORD_START,
});
const resetPasswordSuccess = (resetPsswdResp) => ({
   type: authActionTypes.RESET_PASSWORD_SUCCESS,
   payload: resetPsswdResp,
});
const resetPasswordFailure = (message) => ({
   type: authActionTypes.RESET_PASSWORD_FAILURE,
   payload: message,
});

//ACTIONS FOR SETTING PASSWORD
const setPasswordStart = () => ({
   type: authActionTypes.SET_PASSWORD_START,
});
const setPasswordSuccess = (setPsswdResp) => ({
   type: authActionTypes.SET_PASSWORD_SUCCESS,
   payload: setPsswdResp,
});
const setPasswordFailure = (message) => ({
   type: authActionTypes.SET_PASSWORD_FAILURE,
   payload: message,
});

//LOGIN ASYNC
/**
 * 
 * @param {{email:String, password:String}} param0 
 * @param {Function} callback 
 * @returns 
 */
export const loginAsync = ({ email, password }, callback) => async (
   dispatch
) => {
   dispatch(loginStart());

   try {
      const resp = await authApi.login(email, password);
      const { token } = resp.data;
      callback && callback()

      dispatch(loginSuccess({ token }));
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(loginFailure(message));
   }
};

//REGISTER ASYNC
/**
 * 
 * @param {Object} params 
 * @param {Function} callback 
 * @returns 
 */
export const authRegisterAsync = (params, callback) => async (dispatch) => {
   dispatch(registerStart());

   try {
      const response = await authApi.register(params);
      dispatch(registerSuccess(response.data));
      callback && callback()
      return { type: "success", message: response?.data?.success?.message };
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(registerFailure());
      return { type: "error", message };
   }
};

//LOGOUT ASYNC
export const logOutAsync = () => async (dispatch) => {
   try {
      const response = await authApi.logout();
      return { type: "success", message: response?.data?.success?.message };
   } catch (error) {
      const message = handleAJAXError(error);
      return { type: "error", message };
   }
};

// RESET PASSWORD ASYNC
/**
 * 
 * @param {Object} params 
 * @param {Function} callback 
 * @returns 
 */
export const resetPasswordAsync = (params, callback) => async (dispatch) => {
   dispatch(resetPasswordStart());

   try {
      const response = await authApi.resetPassword(params);
      dispatch(resetPasswordSuccess(response?.data));
      callback && callback()
      return { type: "success", message: response?.data?.success?.message };
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(resetPasswordFailure(message));
      return { type: "error", message };
   }
};

// SET PASSWORD ASYNC
/**
 * 
 * @param {Object} params 
 * @param {Function} callback 
 * @returns 
 */
export const setPasswordAsync = (params, callback) => async (dispatch) => {
   dispatch(setPasswordStart());

   try {
      const response = await authApi.setPassword(params);
      dispatch(setPasswordSuccess(response?.data));
      callback && callback()
      return { type: "success", message: response?.data?.success?.message };
   } catch (error) {
      const message = handleAJAXError(error);
      dispatch(setPasswordFailure(message));
      return { type: "error", message };
   }
};
