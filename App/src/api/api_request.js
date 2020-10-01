import axios from "axios";

// "http://localhost:8088/match/matchesPage"

const apiCall = (
  route,
  params,
  successCallback,
  errorCallback,
  loaderEventCallback
) => {
  console.log("in requestMatches");
  if (loaderEventCallback) loaderEventCallback(true);
  const timer = setTimeout(() => {
    axios
      .post(route, params)
      .then((response) => {
        console.log("ici");
        successCallback(response, params.page);
        if (loaderEventCallback) loaderEventCallback(false);
      })
      .catch((error) => {
        console.log("ici catch");
        if (loaderEventCallback) loaderEventCallback(false);
        if (errorCallback) errorCallback(error);
      });
  }, 250);
};

export default apiCall;
