import React from "react";
import requestMatchesCall from "../common/requestMatches.js";

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
        { age: filter.age, page: filter.page },
        filter.page > 1 ? setMatches : setMatchesReset,
        null,
        toggleBackdropLoader
      );
    }
  });

  return null;
}

export default MatchRequest;
