const {
  HIDE_SNACK_BAR,
  SHOW_SNACK_BAR,
} = require("../actionConst");

const initialSnackBar = {
  open: false,
  message: "",
  severity: "error",
  anchor: {
    vertical: "top",
    horizontal: "center",
  },
};

const snackBar = (state = initialSnackBar, action) => {
  switch (action.type) {
    case HIDE_SNACK_BAR:
      return { ...state, open: false };
    case SHOW_SNACK_BAR:
      return {
        open: true,
        message: action.message,
        severity: action.severity,
        anchor: action.anchor,
      };
    default:
      return state;
  }
};

export default snackBar;
