export const toggleTag = (name) => ({
  type: "TOGGLE_TAG",
  name,
});

export const changeAge = (event, value) => ({
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

export const toggleUseFilter = () => ({
  type: "TOGGLE_USE_FILTER",
});
