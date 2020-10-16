const defaultLoaderState = false;

const globalLoaderState = (state = defaultLoaderState, action) => {
  switch (action.type) {
    case "TOGGLE_GLOBAL_LOADER":
      return action.state;
    default:
      return state;
  }
};

export default globalLoaderState;
