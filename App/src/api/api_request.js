import axios from "axios";
import { useDispatch, useStore } from "react-redux";
import { setRedirectPath } from "../state/redirectPath/redirectPathAction";
import { setSocket } from "../state/socket/socketAction.js";
import socketIOClient from "socket.io-client";
import { BASE_SOCKET_URL, SOCKET_PATH } from "../api/routes";

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
  const reduxState = useStore().getState();

  const apiCallfunction = (
    params,
    successCallback,
    errorCallback,
    loaderEventCallback
  ) => {
    console.log("in apiCall");
    let config = {};
    let successCallbackParams = [];
    let errorCallbackParams = [];
    let route = apiCallConfig.route;
    if (successCallback && successCallback.params && successCallback.callback) {
      successCallbackParams = Array.isArray(successCallback.params)
        ? successCallback.params
        : [successCallback.params];
      successCallback = successCallback.callback;
    }
    if (errorCallback && errorCallback.params && errorCallback.callback) {
      errorCallbackParams = Array.isArray(errorCallback.params)
        ? errorCallback.params
        : [errorCallback.params];
      errorCallback = errorCallback.callback;
    }
    if (params && params.urlParams) {
      route = apiCallConfig.route + "/" + params.urlParams;
      const { urlParams, ...rest } = params;
      params = rest;
      console.log("params : ", params);
    }
    if (apiCallConfig.sendToken || apiCallConfig.sendToken === undefined) {
      const xToken = localStorage.getItem("x-token");
      const xRefreshToken = localStorage.getItem("x-refresh-token");
      if (!xToken || !xRefreshToken) {
        dispatch(setRedirectPath("/login"));
        return;
      }
      config.headers = {
        "x-token": JSON.parse(xToken),
        "x-refresh-token": JSON.parse(xRefreshToken),
      };
    }
    if (apiCallConfig.method === "GET" && params) {
      config.params = params;
    }
    const getOrPost =
      apiCallConfig.method === "GET"
        ? () => axios.get(route, config)
        : apiCallConfig.method === "POST"
          ? () => axios.post(route, params, config)
          : () => axios.put(route, params, config);
    if (loaderEventCallback) loaderEventCallback(true);

    setTimeout(() => {
      getOrPost()
        .then((response) => {
          console.log("in post");
          if (successCallback)
            successCallback(response, ...successCallbackParams);
          if (response.headers["x-token"])
            saveState("x-token", response.headers["x-token"]);
          if (response.headers["x-refresh-token"])
            saveState("x-refresh-token", response.headers["x-refresh-token"]);
          if (loaderEventCallback) loaderEventCallback(false);
          if (reduxState.socket) console.log(reduxState.socket.id);
          if (!reduxState.socket || !reduxState.socket.id) {
            const socket = socketIOClient(BASE_SOCKET_URL, {
              path: SOCKET_PATH,
              query: {
                token: JSON.parse(localStorage.getItem("x-refresh-token")),
              },
            });
            dispatch(setSocket(socket));
          }
        })
        .catch((error) => {
          console.log("error response : ", error);
          const status = error.response.status;
          console.log("ici catch");
          if (loaderEventCallback) loaderEventCallback(false);
          if (errorCallback) errorCallback(error, ...errorCallbackParams);
          console.log("avant dispatch");
          if (status === 401) {
            dispatch(setRedirectPath("/login"));
          }
        });
    }, 10);
  };

  return apiCallfunction;
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
  setTimeout(() => {
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
      "x-token": JSON.parse(localStorage.getItem("x-token")),
      "x-refresh-token": JSON.parse(localStorage.getItem("x-refresh-token")),
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
      if (response.headers["x-token"])
        saveState("x-token", response.headers["x-token"]);
      if (response.headers["x-refresh-token"])
        saveState("x-refresh-token", response.headers["x-refresh-token"]);
      successCallback(response, successParam);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error, errorParam);
    });
};

export const apiCallGet = (
  route,
  successCallback,
  successParam,
  errorCallback,
  errorParam,
  sendToken = true
) => {
  let config = null;
  if (sendToken) config = setTokenInHeader();

  axios
    .get(route, config)
    .then((response) => {
      if (response.headers["x-token"])
        saveState("x-token", response.headers["x-token"]);
      if (response.headers["x-refresh-token"])
        saveState("x-refresh-token", response.headers["x-refresh-token"]);
      successCallback(response, successParam);
    })
    .catch((error) => {
      console.log("ici catch");
      if (errorCallback) errorCallback(error, errorParam);
    });
};
export default apiCall;
