const {
  HIDE_SNACK_BAR,
  SHOW_SNACK_BAR,
  SNACK_BAR_SUCCESS,
  SNACK_BAR_FAILURE,
  NO_SNACK_BAR,
} = require("../actionConst");

const initialState = NO_SNACK_BAR;
const snackBar = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_SNACK_BAR:
      return NO_SNACK_BAR;
    case SHOW_SNACK_BAR:
      if (action.hashFound) {
        return SNACK_BAR_SUCCESS;
      }
      return SNACK_BAR_FAILURE;
    default:
      return state;
  }
};

export default snackBar;
