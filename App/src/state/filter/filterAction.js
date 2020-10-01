import {
  TOGGLE_TAG,
  CHANGE_AGE,
  SET_PAGE_NB,
  TOGGLE_USE_FILTER,
} from "../actionConst.js";

export const toggleTag = (name) => ({
  type: TOGGLE_TAG,
  name,
});

export const changeAge = (value) => ({
  type: CHANGE_AGE,
  value,
});

export const setPageNb = () => ({
  type: SET_PAGE_NB,
});

export const toggleUseFilter = () => ({
  type: TOGGLE_USE_FILTER,
});