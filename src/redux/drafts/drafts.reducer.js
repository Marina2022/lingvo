const initialState = {
   name: "",
   cost: null,
   nativeLanguageId: 4,
   foreignLanguageId: 0,
   topics: [],
   shared: false,
};

const draftReducer = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_TOPICS_TO_COURSE":
         console.log(action.payload);
         return { ...state, topics: action.payload };
      case "SAVE_DRAFT_COURSE":
         console.log(action.payload);
         return {
            ...state,
            author: action.payload.author,
            id: action.payload.id,
            name: action.payload.name,
            cost: action.payload.cost,
            shared: action.payload.shared,
            nativeLanguageId: action.payload.nativeLanguageId,
            foreignLanguageId: action.payload.foreignLanguageId,
            current: action.payload.current,
            topics: action.payload.topics
               ? action.payload.topics
               : state.topics,
         };
      case "CLEAR_DRAFTS":
         return {
            ...initialState,
         };
      default:
         return state;
   }
};
export default draftReducer;
