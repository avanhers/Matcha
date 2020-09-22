const initialeMatchesState = {
  isFetching: false,
  matches: {},
};

const matches = (state = initialeMatchesState, action) => {
  switch (action.type) {
    case "MATCH_REQUEST":
      return { ...state, isFetching: true };
    case "MATCH_RESPONSE":
      return { ...state, isFetching: false, matches: action.matches };
    default:
      return state;
  }
};

export default matches;
