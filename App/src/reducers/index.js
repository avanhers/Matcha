import { combineReducers } from "redux";
import tags from "./tagFilter.js";
import age from "./ageFilter.js";
import user from "./user";
import drawerStatus from "./drawerStatus.js";
import matches from "./matches.js";
import globalLoaderState from "./globalLoaderState";

import filterStatus from "./filterStatus.js";
export default combineReducers({
  tags,
  age,
  user,
  drawerStatus,
  matches,
  filterStatus,
  globalLoaderState,
});
