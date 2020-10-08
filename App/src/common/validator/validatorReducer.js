export const initialState = {
  value: {},
  error: {},
  focus: {},
  submitted: false,
};

export const validationReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: { ...state.value, ...action.payload } };
    case "SUBMIT":
      return { ...state, submitted: action.payload };
    case "VALIDATE":
      const errors = { ...action.payload };
      return { ...state, error: errors };
    case "FOCUS":
      return { ...state, focus: action.payload };
    default:
      return state;
  }
};
