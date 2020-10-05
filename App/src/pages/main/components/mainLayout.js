import React from "react";

import MatchWindowContainer from "./../containers/matchWindowContainer.js";
import HeadBarContainer from "./../containers/headBarContainer.js";
import FilterDrawerContainer from "./../containers/filterDrawerContainer.js";

import BackdropLoaderContainer from "../../../common/containers/backdropLoaderContainer.js";

function MainLayout({ requestMatch, setMatches }) {
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  // React.useEffect(() => {
  //   requestMatch();
  //   requestMatches({ page: 1 }, setMatches);
  // });

  return (
    <div>
      <HeadBarContainer />
      <FilterDrawerContainer />
      <MatchWindowContainer />
    </div>
  );
}

export default MainLayout;
