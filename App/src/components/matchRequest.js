import React from "react";
import requestMatchesCall from "../common/requestMatches.js";

const MATCH_PROFIL_ROUTE = "http://localhost:8088/match/matchesPage";

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
    if (Object.keys(user).length !== 0) {
      console.log("pasteque");
      requestMatchesCall(
        MATCH_PROFIL_ROUTE,
        filter,
        filter.page > 1 ? setMatches : setMatchesReset,
        null,
        toggleBackdropLoader
      );
    }
  });

  return null;
}

export default MatchRequest;
