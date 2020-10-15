import {
  SET_USER,
  AUTH_REQUEST,
  AUTH_RESPONSE,
  USER_COMPLETE,
} from "../actionConst.js";

const userInitialState = {
  isFetching: false,
  user: {},
  completed: false,
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, isFetching: true };
    case AUTH_RESPONSE:
      console.log(action.json, "json");
      return { ...state, isFetching: false, user: action.json };
    case USER_COMPLETE:
      return { ...state, completed: action.value };
    default:
      return state;
  }
};

export default user;
