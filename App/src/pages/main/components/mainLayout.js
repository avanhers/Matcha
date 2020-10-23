import React from "react";

import MatchWindowContainer from "./../containers/matchWindowContainer.js";
import HeadBarContainer from "./../containers/headBarContainer.js";
import FilterDrawerContainer from "./../containers/filterDrawerContainer.js";
import MatchRequestContainer from "../../../common/containers/matchRequestContainer.js";

function MainLayout() {
  return (
    <div>
      <MatchRequestContainer />
      <HeadBarContainer />
      <FilterDrawerContainer />
      {/* <MatchWindowContainer /> */}
    </div>
  );
}

export default MainLayout;
