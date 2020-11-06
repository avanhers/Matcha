import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchWindowContainer from "./../containers/matchWindowContainer.js";
import HeadBarContainer from "../../../common/containers/headBarContainer.js";
import FilterDrawerContainer from "./../containers/filterDrawerContainer.js";
import MatchRequestContainer from "../../../common/containers/matchRequestContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  },
  grow: {
    flexGrow: 1,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainLayout() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mainComponent] = React.useState(
    <MatchWindowContainer />
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <MatchRequestContainer />
      <CssBaseline />
      <HeadBarContainer handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <FilterDrawerContainer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        //handleClick={handleClickSideBar}
        />
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainComponent}
      </main>
    </div>
  );
}

export default MainLayout;
