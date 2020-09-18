import { combineReducers } from "redux";
import tags from "./tagFilter.js";
import age from "./ageFilter.js";
import user from "./user";

export default combineReducers({
  tags,
  age,
  user,
});
