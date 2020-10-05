import { HIDE_SNACK_BAR, SHOW_SNACK_BAR } from "../actionConst.js";

export const hideSnackBar = () => ({
  type: HIDE_SNACK_BAR,
});

export const showSnackBar = (hashFound) => ({
  type: SHOW_SNACK_BAR,
  hashFound,
});
