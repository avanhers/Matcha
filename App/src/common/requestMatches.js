import axios from "axios";

const requestMatches = (
  page,
  nbElem,
  successCallback,
  errorCallback,
  loaderEventCallback
) => {
  axios
    .post("http://localhost:8080/matchesPage", {
      offset: (page - 1) * nbElem,
      nbElem: nbElem,
    })
    .then((response) => {
      let err = response.data.error;
      if (err) console.log("Error message", err);
      console.log(response, "response");
      successCallback(response.data, page);
      if (loaderEventCallback) loaderEventCallback(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default requestMatches;
