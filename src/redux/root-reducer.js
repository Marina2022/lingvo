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
import storage from "redux-persist/lib/storage";

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
      ['persist:root', 'persist:auth'].forEach(item => {
         storage.removeItem(item)
         // window.localStorage.removeItem(item)
      });

      // ['persist:topics', 'persist:courses'].forEach(item => {
      //    // storage.removeItem(item)
      //    window.sessionStorage.removeItem(item)
      // });

      return appReducer(undefined, action)
   }  
   return appReducer(state, action)   
}

export default persistReducer(persistConfig, rootReducer);
