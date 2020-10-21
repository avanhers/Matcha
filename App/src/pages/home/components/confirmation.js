import React from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  CONFIRMATION_ROUTE,
  HASH_RESET_EXIST_ROUTE,
} from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";

/*
 **Component
 */
export default function Confirmation({
  toggleBackdropLoader,
  showSnackBar,
  location,
}) {
  const { token } = useParams();
  const [redirectPath, setRedirectPath] = React.useState("");
  React.useEffect(() => {
    const route = location.pathname.split("/")[1];
    if (route && !redirectPath) {
      if (route === "confirmation") {
        apiCall(
          CONFIRMATION_ROUTE + "/" + token,
          null,
          handleAPIResponseConfirmation,
          null,
          toggleBackdropLoader,
          "GET"
        );
      } else if (route === "reset") {
        apiCall(
          HASH_RESET_EXIST_ROUTE + "/" + token,
          null,
          handleAPIResponseReset,
          null,
          toggleBackdropLoader,
          "GET"
        );
      }
    }
  });
  const handleAPIResponseConfirmation = (response) => {
    let body = response.data;
    const status = body.status;
    setRedirectPath("/");
    if (status === 204) {
      showSnackBar(
        "Votre compte est desormais actif, connectes toi sale con !",
        "success"
      );
    } else {
      showSnackBar("WTF!!!! TON HASH EST PAS VALIDE", "error");
    }
  };

  const handleAPIResponseReset = (response) => {
    let body = response.data;
    const status = body.status;
    console.log(status);
    if (status === 200) {
      const redirectPathWithToken = {
        pathname: "/reset-password",
        state: { userId: body.id },
      };
      setRedirectPath(redirectPathWithToken);
    } else {
      setRedirectPath("/");
      showSnackBar("WTF!!!! TON HASH EST PAS VALIDE", "error");
    }
  };

  if (redirectPath) {
    return (
      <div>
        <Redirect to={redirectPath} />
      </div>
    );
  } else {
    return null;
  }
}
