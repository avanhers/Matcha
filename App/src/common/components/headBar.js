import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";

import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useApiCall } from "../../api/api_request.js";
import { LOG_OUT_ROUTE } from "../../api/routes.js";
import Notification from "./notification.js";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
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
  },
  hide: {
    display: "none",
  },
}));

const apiCallLogOutConfig = {
  route: LOG_OUT_ROUTE,
  method: "GET",
};

//TODO : Using Redux to open component
function HeadBar({ handleDrawerToggle, socket, setRedirect }) {
  const classes = useStyles();
  const theme = useTheme();
  const [nbNotif, setNbNotif] = React.useState(0);
  const [listNotif, setListNotif] = React.useState([]);
  const apiCall = useApiCall(apiCallLogOutConfig);

  const successLogoutCallback = (response) => {
    localStorage.removeItem("x-token");
    localStorage.removeItem("x-refresh-token");
    setRedirect("/login");
    socket.disconnect();
  };

  const handleLogOutClick = () => {
    apiCall(null, successLogoutCallback);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <Typography variant="h6" noWrap>
            Matcha
          </Typography>
          <div className={classes.sectionDesktop}>
            <Link to="/chat" style={{ color: "#FFF" }}>
              <IconButton color="inherit">
                <Badge badgeContent={7} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>
            <Notification socket={socket} />
            <Link to="/profil" style={{ color: "#FFF" }}>
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
            <IconButton color="inherit" onClick={handleLogOutClick}>
              <Badge color="secondary">
                <MeetingRoomIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeadBar;
