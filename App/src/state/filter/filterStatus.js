const initialState = false;
const filterStatus = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_USE_FILTER":
      return !state;
    default:
      return state;
  }
};

export default filterStatus;
