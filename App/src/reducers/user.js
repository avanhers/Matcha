const userInitialState = {
  isFetching: false,
  user: {},
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, isFetching: true };
    case "AUTH_RESPONSE":
      console.log(action.json, "json");
      return { ...state, isFetching: false, user: action.json };
    default:
      return state;
  }
};

export default user;
