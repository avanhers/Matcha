import React from "react";
import FilterDrawer from "./filterDrawer.js";
import { Button } from "@material-ui/core";
import HeadBar from "./headBar.js";
import MatchWindowContainer from "../containers/matchWindowContainer.js";
import HeadBarContainer from "../containers/headBarContainer.js";
import FilterDrawerContainer from "../containers/filterDrawerContainer.js";
import axios from "axios";
import requestMatches from "../common/requestMatches.js";
import BackdropLoaderContainer from "../containers/backdropLoaderContainer.js";

function MainLayout({ requestMatch, setMatches }) {
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  React.useEffect(() => {
    requestMatch();
    requestMatches(1, 10, setMatches);
  });

  return (
    <div>
      <HeadBarContainer />
      <FilterDrawerContainer />
      <MatchWindowContainer />
      <BackdropLoaderContainer />
    </div>
  );
}

export default MainLayout;
