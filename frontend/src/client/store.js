import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./reducers/RootReducer";

const isBrowser = typeof window !== "undefined";
const composeEnhancers = isBrowser
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));

const configureStore = initialState => {
    return createStore(RootReducer, initialState, enhancers);
};

export default configureStore;
