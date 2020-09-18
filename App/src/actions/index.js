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
