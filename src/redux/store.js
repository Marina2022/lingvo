import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./root-reducer";

const logger = createLogger({
   collapsed: true,
});

const middlewares = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "development") {
   middlewares.push(logger);
}

export const store = createStore(
   rootReducer,
   composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
