import axios from "axios";
import { useDispatch } from "react-redux";
import { setRedirectPath } from "../state/redirectPath/redirectPathAction";

// "http://localhost:8088/match/matchesPage"

const saveState = (name, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch {
    // ignore write errors
  }
};

export const useApiCall = (apiCallConfig) => {
  const dispatch = useDispatch();

  const apiCallfunction = (
    // route,
    params,
    successCallback,
    errorCallback,
    loaderEventCallback
    // type = "POST",
    // sendToken = true
  ) => {
    console.log("in apiCall");
    let config = {};
    if (apiCallConfig.sendToken || apiCallConfig.sendToken === undefined) {
      config.headers = {
        "x-token": JSON.parse(localStorage.getItem("x-token")),
        "x-refresh-token": JSON.parse(localStorage.getItem("x-refresh-token")),
      };
    }
    if (apiCallConfig.method === "GET" && params) {
      config.params = params;
    }
    if (loaderEventCallback) loaderEventCallback(true);
    const timer = setTimeout(() => {
      if (
        apiCallConfig.method === "POST" ||
        apiCallConfig.method === undefined
      ) {
        axios
          .post(apiCallConfig.route, params, config)
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
            const status = error.response.status;
            console.log("ici catch");
            if (loaderEventCallback) loaderEventCallback(false);
            if (errorCallback) errorCallback(error);
            console.log("avant dispatch");
            if (status === 401) {
              dispatch(setRedirectPath("/login"));
            }
          });
      } else {
        axios
          .get(apiCallConfig.route, config)
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
            const status = error.response.status;
            if (loaderEventCallback) loaderEventCallback(false);
            if (errorCallback) errorCallback(error);
            if (status === 401) {
              dispatch(setRedirectPath("/login"));
            }
          });
      }
    }, 1000);
  };

  return apiCallfunction;
};

// const useApiCall = () => {
//   const dispatch = useDispatch();

//   return apiCall;
// };

const apiCall = (
  route = route,
  params = params,
  successCallback = successCallback,
  errorCallback = errorCallback,
  loaderEventCallback = loaderEventCallback,
  type = type,
  sendToken = sendToken
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
          // dispatch(setRedirectPath("/login"));
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
