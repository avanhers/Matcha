import axios from "axios";

// "http://localhost:8088/match/matchesPage"

const apiCall = (
  route,
  params,
  successCallback,
  errorCallback,
  loaderEventCallback,
  type = "POST"
) => {
  console.log("in apiCall");

  if (loaderEventCallback) loaderEventCallback(true);
  const timer = setTimeout(() => {
    if (type === "POST") {
      axios
        .post(route, params)
        .then((response) => {
          console.log("in post");
          successCallback(response, params.page);
          if (loaderEventCallback) loaderEventCallback(false);
        })
        .catch((error) => {
          console.log("ici catch");
          if (loaderEventCallback) loaderEventCallback(false);
          if (errorCallback) errorCallback(error);
        });
    } else {
      axios
        .get(route)
        .then((response) => {
          console.log("in get");
          successCallback(response);
          if (loaderEventCallback) loaderEventCallback(false);
        })
        .catch((error) => {
          console.log("ici catch");
          if (loaderEventCallback) loaderEventCallback(false);
          if (errorCallback) errorCallback(error);
        });
    }
  }, 1000);
};

export default apiCall;
