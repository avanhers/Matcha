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
import ChatPopover from "./chatPopover.js";

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
//TODO : Using Redux to open component
function HeadBar({ status, openDrawer }) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickOnNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const render_notification = () => {
    return (
      <IconButton onClick={handleClickOnNotif} color="inherit">
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
            {render_notification()}
            <NotificationPopover
              anchorEl={anchorEl}
              handleClose={handleClose}
            ></NotificationPopover>
            <Link to="/profil" style={{ color: "#FFF" }}>
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
            <ChatPopover />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeadBar;
