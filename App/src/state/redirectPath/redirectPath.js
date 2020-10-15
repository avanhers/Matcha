import { REDIRECT_PATH } from "../actionConst.js";

const initialState = "";

const redirectPath = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT_PATH:
      return action.path;
    default:
      return state;
  }
};

export default redirectPath;
