import React from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  CONFIRMATION_ROUTE,
  PASSWORD_RESET_ROUTE,
} from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";
import {
  SNACK_BAR_SUCCESS,
  SNACK_BAR_FAILURE,
} from "../../../state/actionConst.js";

/*
 **Component
 */
export default function Confirmation({
  toggleBackdropLoader,
  showSnackBar,
  location,
}) {
  const { token } = useParams();
  const [response, setResponse] = React.useState(false);
  React.useEffect(() => {
    const route = location.pathname.split("/")[1];
    if (route && response === false) {
      if (route === "confirmation") {
        apiCall(
          CONFIRMATION_ROUTE + "/" + token,
          null,
          handleAPIResponse,
          null,
          toggleBackdropLoader,
          "GET"
        );
      } else if (route === "reset") {
        apiCall(
          PASSWORD_RESET_ROUTE + "/" + token,
          null,
          handleAPIResponse,
          null,
          toggleBackdropLoader,
          "GET"
        );
      }
    }
  });
  const handleAPIResponse = (response) => {
    let body = response.data;
    const status = body.status;
    console.log("status", status);
    if (status === 204) {
      setResponse(true);
      showSnackBar(
        "Votre compte est desormais actif, connectes toi sale con !",
        "success"
      );
    } else {
      console.log("ici", status);
      setResponse(true);
      showSnackBar("WTF!!!! TON HASH EST PAS VALIDE", "error");
    }
  };

  if (response) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  } else {
    return null;
  }
}
