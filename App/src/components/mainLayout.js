import React from "react";
import FilterDrawer from "./filterDrawer.js";
import { Button } from "@material-ui/core";
import HeadBar from "./headBar.js";
import MatchWindowContainer from "../containers/matchWindowContainer.js";
import HeadBarContainer from "../containers/headBarContainer.js";
import FilterDrawerContainer from "../containers/filterDrawerContainer.js";
import axios from "axios";
function MainLayout({ requestMatch, setMatches }) {
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  React.useEffect(() => {
    requestMatch();
    axios
      .get("http://localhost:8080/all")
      .then((response) => {
        let err = response.data.error;
        if (err) console.log("Error message", err);
        console.log(response);
        setMatches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
