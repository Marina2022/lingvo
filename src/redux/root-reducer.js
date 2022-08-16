import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import {
   persistConfig,
   authPersistConfig,
   topicsPersistConfig,
   coursesPersistConfig,
} from "./persist-config";

// REDUCERS
import authReducer from "./auth/auth.reducer.js";
import profileReducer from "./profile/profile.reducer";
import topicsReducer from "./topics/topics.reducer";
import commonReducer from "./common/common.reducer";
import unitsReducer from "./units/units.reducer";
import coursesReducer from "./courses/courses.reducer";
import draftReducer from "./drafts/drafts.reducer";
import { authActionTypes } from "./auth/auth.types";
import localStorage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

const appReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authReducer),
   profile: profileReducer,
   topics: persistReducer(topicsPersistConfig, topicsReducer),
   common: commonReducer,
   units: unitsReducer,
   courses: persistReducer(coursesPersistConfig, coursesReducer),
   drafts: draftReducer,
});

const rootReducer = (state, action) => {
   if (action.type === authActionTypes.USER_LOGOUT) {
      localStorage.removeItem('persist:root')
      localStorage.removeItem('persist:auth')
      
      sessionStorage.removeItem('persist:topics')
      sessionStorage.removeItem('persist:courses')
      
      state = undefined

      setTimeout(() => { try {
         window.location.reload()
      } catch (e) {
         console.error(e)
      }}, 100)
   }  
   return appReducer(state, action)   
}

export default persistReducer(persistConfig, rootReducer);
