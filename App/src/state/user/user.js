import { SET_USER, AUTH_REQUEST, AUTH_RESPONSE } from "../actionConst.js";

const userInitialState = {
  isFetching: false,
  completed: false,
  user: {},
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, isFetching: true };
    case AUTH_RESPONSE:
      console.log(action.json, "json");
      return { ...state, isFetching: false, completed: action.json };
    default:
      return state;
  }
};

export default user;
