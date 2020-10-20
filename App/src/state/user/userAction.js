import {
  SET_USER,
  AUTH_REQUEST,
  AUTH_RESPONSE,
  USER_COMPLETE,
} from "../actionConst.js";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const authRequest = (user) => ({
  type: AUTH_REQUEST,
  user,
});

export const authResponse = (json) => ({
  type: AUTH_RESPONSE,
  json,
});

export const setUserComplete = (value) => ({
  type: USER_COMPLETE,
  value,
});
