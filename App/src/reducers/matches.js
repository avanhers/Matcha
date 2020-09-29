const initialeMatchesState = {
  isFetching: false,
  pageNb: 1,
  matches: [],
};

const matches = (state = initialeMatchesState, action) => {
  switch (action.type) {
    case "MATCH_REQUEST":
      return { ...state, isFetching: true };
    case "MATCH_RESPONSE":
      return {
        ...state,
        isFetching: false,
        pageNb: action.page,
        matches: [...state.matches, ...action.matches],
      };
    case "MATCH_RESPONSE_RESET":
      return {
        ...state,
        isFetching: false,
        pageNb: 1,
        matches: action.matches,
      };
    default:
      return state;
  }
};

export default matches;
