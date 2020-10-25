import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";

import HeadBar from "./headBar.js";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "./sideBar.js";
import ChatBox from "./chatBox.js";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
import { apiCall, apiCallGet } from "../../../api/api_request.js";
import { GET_MESSAGE_USERS, GET_AVATAR_ROUTE } from "../../../api/routes.js";
import { useStore } from "react-redux";

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

const myMatch = [
  {
    username: "toto",
    avatar: profilPlaceholder,
    isLogin: false,
  },
];

/*
 ********************** Component *****************************
 */

function Chat() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mainComponent, setMainComponent] = React.useState("");
  const [users, setUsers] = React.useState(myMatch);
  const [myAvatar, setMyAvatar] = React.useState("");
  const socket = useStore().getState().socket;

  useEffect(() => {
    apiCallGet(GET_MESSAGE_USERS, sucessCall, null, null, null);
    apiCall(GET_AVATAR_ROUTE, null, successGetAvatar, null, null, "GET", true);
    if (socket) {
      socket.on("message", (data) => {
        let newUsers = addOneMessToNotif(data.username);
      });
    }
  }, []);

  const addOneMessToNotif = (username) => {
    let newUsers = users.map((i) => {
      if (i.username === username) i.nbMess++;
    });
    // setUsers(newUsers);
  };

  const successGetAvatar = (response) => {
    if (response.data.avatar.id > 0) setMyAvatar(response.data.avatar.path);
  };

  const sucessCall = (response) => {
    setUsers(response.data.users);

    console.log("users", response.data.users);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickUser = (user) => {
    setMainComponent(<ChatBox user={user} myAvatar={myAvatar} />);
    console.log("clickSideBar", user);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeadBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <SideBar
          users={users}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleClickUser={handleClickUser}
        />
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainComponent}
      </main>
    </div>
  );
}

export default Chat;
