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

const rootReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authReducer),
   profile: profileReducer,
   topics: persistReducer(topicsPersistConfig, topicsReducer),
   common: commonReducer,
   units: unitsReducer,
   courses: persistReducer(coursesPersistConfig, coursesReducer),
});

export default persistReducer(persistConfig, rootReducer);
