import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk" 
import{ withCombineReducers } from "./reducers"; 

let store

store = createStore(withCombineReducers, applyMiddleware(thunk));


export default store;