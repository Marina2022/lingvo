import { authActionTypes } from "./auth.types.js";

const INITIAL_STATE = {
   token: null,
   errorMessage: null,
   isLoading: false,
   // RESET PASSWORD
   resetPasswordResponse: null,
   resetPasswordLoading: false,
   resetPasswordMessage: "",
   // SET PASSWORD
   setPasswordResponse: null,
   setPasswordLoading: false,
   setPasswordMessage: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case authActionTypes.USER_LOGOUT: {
         // window.localStorage.clear();
         // window.sessionStorage.clear();
         return { ...INITIAL_STATE, errorMessage: action.payload };
      }
      //! USER LOGIN
      case authActionTypes.LOGIN_START:
         return { ...state, isLoading: true };
      case authActionTypes.LOGIN_SUCCESS: {
         const { token = state.token } = action.payload;
         return { ...state, isLoading: false, token };
      }
      case authActionTypes.LOGIN_FAILURE:
         return { ...state, isLoading: false, errorMessage: action.payload };

      //! USER REGISTER
      case authActionTypes.REGISTER_START:
         return { ...state, isLoading: true };
      case authActionTypes.REGISTER_SUCCESS: {
         const { token = state.token } = action.payload;

         return {
            ...state,
            isLoading: false,
            token,
         };
      }
      case authActionTypes.REGISTER_FAILURE:
         return { ...state, isLoading: false };

      //! RESET PASSWORD
      case authActionTypes.RESET_PASSWORD_START:
         return { ...state, resetPasswordLoading: true };
      case authActionTypes.RESET_PASSWORD_SUCCESS: {
         return {
            ...state,
            resetPasswordLoading: false,
            resetPasswordResponse: action.payload,
         };
      }
      case authActionTypes.RESET_PASSWORD_FAILURE:
         return {
            ...state,
            resetPasswordLoading: false,
            resetPasswordMessage: action.payload,
         };

      //! SET PASSWORD
      case authActionTypes.SET_PASSWORD_START:
         return { ...state, setPasswordLoading: true };
      case authActionTypes.SET_PASSWORD_SUCCESS: {
         return {
            ...state,
            setPasswordLoading: false,
            setPasswordResponse: action.payload,
         };
      }
      case authActionTypes.SET_PASSWORD_FAILURE:
         return {
            ...state,
            setPasswordLoading: false,
            setPasswordMessage: action.payload,
         };
      default:
         return state;
   }
};

export default authReducer;
