import axios from "axios";

// "http://localhost:8088/match/matchesPage"

const requestMatches = (
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
        let err = response.data.error;
        if (err) console.log("Error message", err);
        console.log(response, "response");
        successCallback(response.data, params.page);
        if (loaderEventCallback) loaderEventCallback(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 1000);
};

export default requestMatches;
