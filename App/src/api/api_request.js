import axios from "axios";

// "http://localhost:8088/match/matchesPage"

export const saveState = (name, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch {
    // ignore write errors
  }
};

const apiCall = (
  route,
  params,
  successCallback,
  errorCallback,
  loaderEventCallback,
  type = "POST",
  sendToken = true
) => {
  console.log("in apiCall");
  let config = {};
  if (sendToken) {
    config.headers = {
      "x-token": JSON.parse(localStorage.getItem("x-token")),
      "x-refresh-token": JSON.parse(localStorage.getItem("x-refresh-token")),
    };
  }
  if (type === "GET" && params) {
    config.params = params;
  }
  if (loaderEventCallback) loaderEventCallback(true);
  const timer = setTimeout(() => {
    if (type === "POST") {
      axios
        .post(route, params, config)
        .then((response) => {
          console.log("in post");
          if (successCallback) successCallback(response, params.page);
          if (response.headers["x-token"])
            saveState("x-token", response.headers["x-token"]);
          if (response.headers["x-refresh-token"])
            saveState("x-refresh-token", response.headers["x-refresh-token"]);
          if (loaderEventCallback) loaderEventCallback(false);
        })
        .catch((error) => {
          console.log("ici catch");
          if (loaderEventCallback) loaderEventCallback(false);
          if (errorCallback) errorCallback(error);
        });
    } else {
      axios
        .get(route, config)
        .then((response) => {
          console.log("in get", response.request.status);
          if (successCallback) successCallback(response);
          if (response.headers["x-token"])
            saveState("x-token", response.headers["x-token"]);
          if (response.headers["x-refresh-token"])
            saveState("x-refresh-token", response.headers["x-refresh-token"]);
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
