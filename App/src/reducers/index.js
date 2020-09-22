import { combineReducers } from "redux";
import tags from "./tagFilter.js";
import age from "./ageFilter.js";
import user from "./user";
import drawerStatus from "./drawerStatus.js";
import matches from "./matches.js";

export default combineReducers({
  tags,
  age,
  user,
  drawerStatus,
  matches,
});
