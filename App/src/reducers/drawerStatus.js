const initialState = false;
const drawerStatus = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return action.status;
    default:
      return state;
  }
};

export default drawerStatus;
