import { REDIRECT_PATH } from "../actionConst.js";

export const setRedirectPath = (path) => ({
  type: REDIRECT_PATH,
  path,
});
