import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";

import HeadBar from "./headBar.js";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "./sideBar";
import MainProfile from "./mainProfil.js";
import MainStat from "./mainStat.js";
import MainSecretInfo from "./mainSecretInfo.js";
const drawerWidth = 240;

/*
 ********************** CSS STYLE *****************************
 */

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

/*
 ********************** Component *****************************
 */

function Profil() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mainComponent, setMainComponent] = React.useState(<MainProfile />);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickSideBar = (key) => {
    if (key === "profil") setMainComponent(<MainProfile />);
    else if (key === "stats") setMainComponent(<MainStat />);
    else if (key === "private") setMainComponent(<MainSecretInfo />);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeadBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleClick={handleClickSideBar}
        />
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainComponent}
      </main>
    </div>
  );
}

Profil.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Profil;
