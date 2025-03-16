import { combineReducers } from "redux";
import isLogin from "./isLogin";
const allReducers = combineReducers({
  // Add reducers here
  isLogin,
});
export default allReducers;
