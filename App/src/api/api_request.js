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

export const apiCall = (
  route,
  params,
  successCallback,
  errorCallback,
  loaderEventCallback,
  type = "POST",
  sendToken = true
) => {
  console.log("in apiCall");
  let config = null;
  if (sendToken) {
    config = {
      headers: {
        "x-token": localStorage.getItem("x-token"),
        "x-refresh-token": localStorage.getItem("x-refresh-token"),
      },
    };
  }
  if (loaderEventCallback) loaderEventCallback(true);
  const timer = setTimeout(() => {
    if (type === "POST") {
      axios
        .post(route, params, config)
        .then((response) => {
          console.log("in post");
          if (successCallback) successCallback(response);
          if (response.headers["x-token"])
            saveState("x-token", response.headers["x-token"]);
          if (response.headers["x-refresh-token"])
            saveState("x-refresh-token", response.headers["x-refresh-token"]);
          if (loaderEventCallback) loaderEventCallback(false);
        })
        .catch((error) => {
          console.log(error);
          if (loaderEventCallback) loaderEventCallback(false);
          if (errorCallback) errorCallback(error);
        });
    } else {
      axios
        .get(route, config)
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
  }, 10);
};

const setTokenInHeader = () => {
  return {
    headers: {
      "x-token": localStorage.getItem("x-token"),
      "x-refresh-token": localStorage.getItem("x-refresh-token"),
    },
  };
};

export const apiCallPost = (
  route,
  param,
  successCallback,
  successParam,
  errorCallback,
  errorParam
) => {
  let config = setTokenInHeader();
  axios
    .post(route, param, config)
    .then((response) => {
      successCallback(response, successParam);
    })
    .catch((error) => {
      console.log("ici catch post");
      if (errorCallback) errorCallback(error, errorParam);
    });
};

export const apiCallGet = (
  route,
  successCallback,
  successParam,
  errorCallback,
  errorParam
) => {
  let config = setTokenInHeader();
  axios
    .get(route, config)
    .then((response) => {
      successCallback(response, successParam);
    })
    .catch((error) => {
      console.log("ici catch");
      if (errorCallback) errorCallback(error, errorParam);
    });
};
export default apiCall;
