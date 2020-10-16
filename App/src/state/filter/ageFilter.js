const defaultFilter = {
  page: 1,
  age: [18, 75],
};

const defaultAgeSTate = [18, 75];

const filter = (state = defaultFilter, action) => {
  switch (action.type) {
    case "CHANGE_AGE":
      return { ...state, age: action.value, page: 1 };
    case "SET_PAGE_NB":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

export default filter;
