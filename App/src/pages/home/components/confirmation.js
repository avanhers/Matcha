import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { CONFIRMATION_ROUTE } from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";
import {
  SNACK_BAR_SUCCESS,
  SNACK_BAR_FAILURE,
} from "../../../state/actionConst.js";

/*
 **Component
 */
export default function Confirmation({ toggleBackdropLoader, showSnackBar }) {
  const { token } = useParams();
  const [response, setResponse] = React.useState(false);
  React.useEffect(() => {
    if (response === false) {
      apiCall(
        CONFIRMATION_ROUTE + "/" + token,
        null,
        handleAPIResponse,
        null,
        toggleBackdropLoader,
        "GET"
      );
    }
  });
  const handleAPIResponse = (response) => {
    let body = response.data;
    const status = body.status;
    console.log("status", status);
    if (status === 204) {
      setResponse(true);
      showSnackBar(true);
    } else {
      console.log("ici", status);
      setResponse(true);
      showSnackBar(false);
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
