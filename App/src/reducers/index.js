import { combineReducers } from "redux";
import tags from "./tagFilter.js";
import age from "./ageFilter.js";

export default combineReducers({
  tags,
  age,
});
