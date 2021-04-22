import {createStore, applyMiddleware, compose} from "redux";

import rootReducer from "./reducers";

import {authMiddleware} from "./middleware";

export const configureStore = (initialState) => {
    const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhencers(applyMiddleware(authMiddleware)))
}