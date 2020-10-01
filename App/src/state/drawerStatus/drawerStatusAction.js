import { TOGGLE_DRAWER } from "../actionConst.js";
export const toggleDrawer = (status) => ({
  type: TOGGLE_DRAWER,
  status,
});
