import React from "react";
import { useApiCall } from "../../api/api_request.js";
import { MATCH_PROFIL_ROUTE } from "../../api/routes.js";

const apiCallConfig = {
  route: MATCH_PROFIL_ROUTE,
  method: "GET",
};

function MatchRequest({
  filter,
  toggleBackdropLoader,
  setMatches,
  setMatchesReset,
  setRedirectPath,
}) {
  const apiCall = useApiCall(apiCallConfig);

  const handleAPISuccess = (response) => {
    let status = false;
    if (response.data) {
      status = response.data.status;
    }
    if (status && status === 401) {
      setRedirectPath("/profil");
    } else if (status && status === 200) {
      filter.page > 1
        ? setMatches(response.data.users)
        : setMatchesReset(response.data.users);
    }
  };
  React.useEffect(() => {
    const { tagsObject, ...filterSent } = filter;

    apiCall(filterSent, handleAPISuccess, null, toggleBackdropLoader);
  }, [filter]);

  return null;
}

export default MatchRequest;
