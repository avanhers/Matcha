export const toggleTag = (name) => ({
  type: "TOGGLE_TAG",
  name,
});

export const changeAge = (value) => ({
  type: "CHANGE_AGE",
  value,
});

export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const toggleDrawer = (status) => ({
  type: "TOGGLE_DRAWER",
  status,
});

export const authRequest = (user) => ({
  type: "AUTH_REQUEST",
  user,
});

export const authResponse = (json) => ({
  type: "AUTH_RESPONSE",
  json,
});

export const matchRequest = () => ({
  type: "MATCH_REQUEST",
});

//Ajoute les réponse a la suite
export const matchResponse = (matches, page) => ({
  type: "MATCH_RESPONSE",
  matches,
  page,
});

// recréé tableau de réponse et set page a 1
export const matchResponseReset = (matches) => ({
  type: "MATCH_RESPONSE_RESET",
  matches,
});

export const toggleGlobalLoader = (state) => ({
  type: "TOGGLE_GLOBAL_LOADER",
  state,
});

export const toggleUseFilter = () => ({
  type: "TOGGLE_USE_FILTER",
});
