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
      const xToken = localStorage.getItem("x-token");
      const xRefreshToken = localStorage.getItem("x-refresh-token");
      if (!xToken || !xRefreshToken) dispatch(setRedirectPath("/login"));
      config.headers = {
        "x-token": JSON.parse(xToken),
        "x-refresh-token": JSON.parse(xRefreshToken),
      };
    }
    if (apiCallConfig.method === "GET" && params) {
      config.params = params;
    }
    console.log(config);
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
      console.log("ici catch");
      if (errorCallback) errorCallback(error, errorParam);
    });
};
export default apiCall;
