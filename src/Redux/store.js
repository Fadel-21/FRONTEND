import { configureStore, combineReducers, applyMiddleware, legacy_createStore as createStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import cartItems from "./Reducers/cartItem";

const reducers = combineReducers({
    cartItems: cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
)

export default store;