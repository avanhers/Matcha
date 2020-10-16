import { SET_USER, AUTH_REQUEST, AUTH_RESPONSE } from "../actionConst.js";

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
