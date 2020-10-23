const defaultFilter = {
  page: 1,
  ageMin: 18,
  ageMax: 75,
  popMin: 0,
  popMax: 100,
  sortBy: "LENGTH(tags)",
  orderBy: "DESC",
  tags: [],
  distMax: 20000,
  tagsObject: {
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: "",
    tag6: "",
    tag7: "",
    tag8: "",
  },
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
    case "TOGGLE_TAG":
      const tagsObject = {
        ...state.tagsObject,
        [action.name]: !state.tagsObject[action.name] ? "1" : "",
      };
      const tags = Object.values(tagsObject);
      return { ...state, page: 1, tags: tags, tagsObject: tagsObject };
    case "SET_SORT_BY":
      return { ...state, page: 1, sortBy: action.payload };
    case "SET_ORDER_BY":
      return { ...state, page: 1, orderBy: action.payload };
    case "SET_DISTANCE_MAX":
      return { ...state, page: 1, distMax: action.payload };
    default:
      return state;
  }
};

export default filter;
