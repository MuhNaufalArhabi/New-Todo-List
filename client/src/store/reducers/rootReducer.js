import { combineReducers } from "redux";
import category from './category'
import todo from "./todo";

const rootReducer = combineReducers({category, todo})

export default rootReducer