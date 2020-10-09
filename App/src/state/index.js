import { combineReducers } from "redux";
import tags from "./filter/tagFilter.js";
import filter from "./filter/ageFilter.js";
import user from "./user/user.js";
import drawerStatus from "./drawerStatus/drawerStatus.js";
import matches from "./profilResult/matches.js";
import globalLoaderState from "./globalLoader/globalLoaderState";
import snackBar from "./snackBar/snackBar.js";
import filterStatus from "./filter/filterStatus.js";
export default combineReducers({
  tags,
  filter,
  user,
  drawerStatus,
  matches,
  filterStatus,
  globalLoaderState,
  snackBar,
});
