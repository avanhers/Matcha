import React from "react";
import apiCall from "../../api/api_request.js";
import { MATCH_PROFIL_ROUTE } from "../../api/routes.js";

function MatchRequest({
  filter,
  toggleBackdropLoader,
  setMatches,
  setMatchesReset,
  setRedirectPath,
}) {
  const [componentMounted, setComponentMounted] = React.useState(false);
  const handleAPISuccess = (response) => {
    let status = false;
    if (response.data) {
      status = response.data.status;
    }
    if (status && status === 401) {
      setRedirectPath("/profil");
    } else if (status && status === 200) {
      filter.page > 1
        ? setMatches(response.body.users)
        : setMatchesReset(response.body.users);
    }
  };

  const handleAPIError = (response) => {
    setRedirectPath("/login");
  };
  React.useEffect(() => {
    if (componentMounted) {
      apiCall(
        MATCH_PROFIL_ROUTE,
        null,
        handleAPISuccess,
        handleAPIError,
        toggleBackdropLoader,
        "GET"
      );
    }
    setComponentMounted(true);
  }, [filter]);

  return null;
}

export default MatchRequest;
