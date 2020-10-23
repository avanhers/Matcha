const { SET_SOCKET } = require("../actionConst");

const initialState = null;

const socket = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socket;
