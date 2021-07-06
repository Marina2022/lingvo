import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

export const persistConfig = {
   key: "root",
   storage: storage,
};

// USERS
export const authPersistConfig = {
   key: "auth",
   storage: storage,
   // blacklist: ["isLoading", "errorMessage"],
};

//TOPICS
export const topicsPersistConfig = {
   key: "topics",
   storage: sessionStorage,
   blacklist: ["isTopicCreatedLoading", "errorMessage", "selectedTopic"],
   whiteList: ["responseData"],
};

// //UNITS
// export const unitsPersistConfig = {
//    key: "units",
//    storage: sessionStorage,
//    blacklist: ["unitCreateLoading"],
// };
// COMMON
// export const commonPersistConfig = {
//    key: "common",
//    storage: sessionStorage,
//    // whitlist: ["categories"],
//    blacklist: [
//       "isMemoryAccordion",
//       "isResidentalAccordion",
//       "isLocationAccordion",
//       "isAgeGroupAccordion",
//       "isHouseHoldsAccordion",
//       "isCompaniesAccordion",
//       "categories",
//       "totalResults",
//    ],
// };
