const defaultFilter = {
  page: 1,
  ageMin: 18,
  ageMax: 75,
  popMin: 0,
  popMax: 100,
};

const defaultAgeSTate = [18, 75];

const filter = (state = defaultFilter, action) => {
  switch (action.type) {
    case "CHANGE_AGE":
      return {
        ...state,
        ageMin: action.value[0],
        ageMax: action.value[1],
        page: 1,
      };
    case "CHANGE_POPULARITY":
      return {
        ...state,
        age: action.value,
        popMin: action.value[0],
        popMax: action.value[1],
        page: 1,
      };
    case "SET_PAGE_NB":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

export default filter;
