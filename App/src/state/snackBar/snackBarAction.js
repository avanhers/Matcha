import { HIDE_SNACK_BAR, SHOW_SNACK_BAR } from "../actionConst.js";

export const hideSnackBar = () => ({
  type: HIDE_SNACK_BAR,
});

export const showSnackBar = (
  message,
  severity = "error",
  anchor = {
    vertical: "top",
    horizontal: "center",
  }
) => ({
  type: SHOW_SNACK_BAR,
  message,
  severity,
  anchor,
});
