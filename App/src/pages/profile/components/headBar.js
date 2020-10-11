import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
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
const drawerWidth = 240;

/*
 ********************** CSS STYLE *****************************
 */

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
    [theme.breakpoints.up("md")]: {
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

/*
 ********************** Component *****************************
 */

function HeadBar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickOnNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /********         START OF RENDERING            ********/
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
      <AppBar position="fixed" className={props.class}>
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
        </div>
      </AppBar>
    </div>
  );
}

export default HeadBar;
