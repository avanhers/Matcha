const defaultAgeSTate = [18, 75];

const age = (state = defaultAgeSTate, action) => {
  switch (action.type) {
    case "CHANGE_AGE":
      return action.value;
    default:
      return state;
  }
};

export default age;
