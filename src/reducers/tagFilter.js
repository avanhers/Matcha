const defaultTags = [
  {
    name: "sex",
    enabled: true,
  },
  {
    name: "rock",
    enabled: true,
  },
  {
    name: "sleep",
    enabled: true,
  },
  {
    name: "eat",
    enabled: true,
  },
  {
    name: "dance",
    enabled: true,
  },
];

const tags = (state = defaultTags, action) => {
  switch (action.type) {
    case "TOGGLE_TAG":
      return state.map((tag) =>
        tag.name === action.name
          ? {
              ...tag,
              enabled: !tag.enabled,
            }
          : tag
      );
    default:
      return state;
  }
};

export default tags;
