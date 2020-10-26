import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { drawerWidth } from "./filterDrawer.js";
import NotificationPopover from "./notificationPopover.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useApiCall } from "../../../api/api_request.js";
import { GET_NOTIFICATIONS, LOG_OUT_ROUTE } from "../../../api/routes.js";
import Notification from "./notification.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
function HeadBar({ status, openDrawer, socket, setRedirect }) {
  const classes = useStyles();
  const theme = useTheme();
  const [nbNotif, setNbNotif] = React.useState(0);
  const [listNotif, setListNotif] = React.useState([]);
  const apiCall = useApiCall(apiCallLogOutConfig);

  const addToNotifs = (data) => {
    const newNotif = [...listNotif];
    newNotif.push(data);
    setListNotif(newNotif);
    setNbNotif(newNotif.length);
  };

  const successNotif = (response) => {
    console.log("success notif");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickOnNotif = (event) => {
    console.log(listNotif);
    if (listNotif.length !== 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const successLogoutCallback = (response) => {
    localStorage.removeItem("x-token");
    localStorage.removeItem("x-refresh-token");
    setRedirect("/login");
    socket.disconnect();
  };

  const handleLogOutClick = () => {
    apiCall(null, successLogoutCallback);
  };

  const render_notification = () => {
    return (
      <IconButton onClick={handleClickOnNotif} color="inherit">
        <Badge badgeContent={nbNotif} color="secondary">
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
            onClick={openDrawer}
            edge="start"
            className={clsx(classes.menuButton, status && classes.hide)}
          >
            <SearchIcon />
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
            {/* {render_notification()}

            <NotificationPopover
              anchorEl={anchorEl}
              handleClose={handleClose}
              notifs={listNotif}
            ></NotificationPopover> */}
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
