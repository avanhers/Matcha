import React from "react";
import { makeStyles } from "@material-ui/core";

// import NotificationPopover from "./notificationPopover.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
//import ChatPopover from "./chatPopover.js";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
}));
//TODO : Using Redux to open component
function HeadBar({ status, handleDrawerToggle }) {
  const classes = useStyles();

  const render_notification = () => {
    return (
      <IconButton color="inherit">
        <Badge badgeContent={49} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    );
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: status,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Matcha
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Badge badgeContent={7} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            {render_notification()}
            {/* <NotificationPopover
              anchorEl={anchorEl}
              handleClose={handleClose}
            ></NotificationPopover> */}
            <Link to="/profil" style={{ color: "#FFF" }}>
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
            {/* <ChatPopover /> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeadBar;
