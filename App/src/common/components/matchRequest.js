import React from "react";
import apiCall from "../../api/api_request.js";

const MATCH_PROFIL_ROUTE = "http://localhost/api/match/matchesPage";

function MatchRequest({
  filter,
  user,
  toggleBackdropLoader,
  setMatches,
  setMatchesReset,
}) {
  console.log("in matches request");
  console.log("filter: ", filter);
  React.useEffect(() => {
    console.log(user);
    // if (Object.keys(user).length !== 0) {
    //   console.log("pasteque");
    //   apiCall(
    //     MATCH_PROFIL_ROUTE,
    //     filter,
    //     filter.page > 1 ? setMatches : setMatchesReset,
    //     null,
    //     toggleBackdropLoader
    //   );
    // }
  });

  return null;
}

export default MatchRequest;
