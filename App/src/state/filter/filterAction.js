import {
  TOGGLE_TAG,
  CHANGE_AGE,
  SET_PAGE_NB,
  TOGGLE_USE_FILTER,
  CHANGE_POPULARITY,
  SET_SORT_BY,
  SET_ORDER_BY,
  SET_DISTANCE_MAX,
} from "../actionConst.js";

export const toggleTag = (name) => ({
  type: TOGGLE_TAG,
  name,
});

export const changeAge = (value) => ({
  type: CHANGE_AGE,
  value,
});

export const changeDistance = (payload) => ({
  type: SET_DISTANCE_MAX,
  payload,
});

export const changePopularity = (value) => ({
  type: CHANGE_POPULARITY,
  value,
});

export const setPageNb = () => ({
  type: SET_PAGE_NB,
});

export const toggleUseFilter = () => ({
  type: TOGGLE_USE_FILTER,
});

export const setSortBy = (payload) => ({
  type: SET_SORT_BY,
  payload,
});

export const setOrderBy = (payload) => ({
  type: SET_ORDER_BY,
  payload,
});
