import axios from "axios";
import { store } from "../redux/store";
import { /*refreshAuthTokenAsync*/ userLogout } from "../redux/auth/auth.actions";
// import { setGlobalErrorMessage } from "redux/common/common.actions";
import handleAJAXError from "../utilities/handleAJAXError.utility";
import Bugsnag from "@bugsnag/js";

// AXIOS GLOBAL CONFIG
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL // || "https://dev.insta.lingvonavi.com/api/v1/";
axios.defaults.baseURL = 'https://dev.insta.lingvonavi.com/api/v1/' // || "https://dev.insta.lingvonavi.com/api/v1/";

axios.interceptors.request.use((request) => {
   const { auth, profile } = store.getState();
   const token = auth.token;
   if (auth?.token !== null) {
      request.headers["authorization"] = `Bearer ${token}`;
   }
   const { id, name, email } = profile?.currentUserInfo ?? {}
   Bugsnag.setUser(id, email, name)

   return request;
});
axios.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      const errorMessage = handleAJAXError(error);

      console.log(errorMessage);
      // if (error.message) store.dispatch(setGlobalErrorMessage(errorMessage));

      const errorStatus = error?.response?.data?.status;

      if (parseInt(errorStatus) === 401) { // Unauthorized
         store.dispatch(userLogout("Token is Expired."));
         // setTimeout(() => {
         //    store.dispatch(refreshAuthTokenAsync());
         // }, 2000);
      }
      return Promise.reject(error);
   }
);

export default axios;
