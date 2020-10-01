import {
  MATCH_REQUEST,
  MATCH_RESPONSE,
  MATCH_RESPONSE_RESET,
  SET_PAGE_NB,
} from "../actionConst.js";

export const matchRequest = () => ({
  type: MATCH_REQUEST,
});

//Ajoute les réponse a la suite
export const matchResponse = (matches, page) => ({
  type: MATCH_RESPONSE,
  matches,
  page,
});

// recréé tableau de réponse et set page a 1
export const matchResponseReset = (matches) => ({
  type: MATCH_RESPONSE_RESET,
  matches,
});

export const setPageNb = () => ({
  type: "SET_PAGE_NB",
});
