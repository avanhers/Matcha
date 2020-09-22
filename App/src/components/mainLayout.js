import React from "react";
import FilterDrawer from "./filterDrawer.js";
import { Button } from "@material-ui/core";
import HeadBar from "./headBar.js";
import MatchWindowContainer from "../containers/matchWindowContainer.js";
import HeadBarContainer from "../containers/headBarContainer.js";
import FilterDrawerContainer from "../containers/filterDrawerContainer.js";

function MainLayout() {
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log("ypppp");
    setDrawerOpened(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };
  return (
    <div>
      <HeadBarContainer />
      <FilterDrawerContainer />
      <MatchWindowContainer />
    </div>
  );
}

export default MainLayout;
