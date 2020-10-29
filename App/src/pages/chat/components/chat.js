import React, { useEffect, useRef } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import HeadBarContainer from "../../../common/containers/headBarContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "./sideBar.js";
import ChatBox from "./chatBox.js";

import { useApiCall } from "../../../api/api_request.js";
import { GET_MESSAGE_USERS, GET_AVATAR_ROUTE } from "../../../api/routes.js";

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

const myMatch = [];
const resetMessage = (username, users) => {
  const newUsers = [...users];
  newUsers.forEach((elem) => {
    if (username === elem.username) {
      elem.unreadMessages = 0;
    }
  });
  return newUsers;
};
const updateUsers = (message, users) => {
  const newUsers = [...users];
  newUsers.forEach((elem) => {
    if (message.from === elem.username) {
      elem.unreadMessages++;
    }
  });
  return newUsers;
};
/*
 ********************** Component *****************************
 */

const configGetUsers = { route: GET_MESSAGE_USERS, method: "GET" };
const configGetAvatar = { route: GET_AVATAR_ROUTE, method: "GET" };
function Chat({ socket }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mainComponent, setMainComponent] = React.useState("");
  const [users, setUsers] = React.useState(myMatch);
  const [myAvatar, setMyAvatar] = React.useState("");
  const apiCallUser = useApiCall(configGetUsers);
  const apiCallAvatar = useApiCall(configGetAvatar);
  const refUser = useRef("");
  const refUsers = useRef(users);
  const refSocket = useRef(false);

  useEffect(() => {
    apiCallUser(null, sucessCall);
    apiCallAvatar(null, successGetAvatar);
  }, []);

  useEffect(() => {
    if (socket && !refSocket.current) {
      console.log("listening on message:CHAT");
      refSocket.current = true;
      socket.on("message", handler);
    }
  }, [socket]);

  const successGetAvatar = (response) => {
    setMyAvatar(response.data.avatar.path);
  };

  const handler = (message) => {
    if (refUser.current.username != message.from) {
      console.log(refUsers.current);
      setUsers(updateUsers(message, refUsers.current));
    }
  };

  const sucessCall = (response) => {
    setUsers(response.data.users);
    refUsers.current = response.data.users;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickUser = (user) => {
    setMainComponent(<ChatBox user={user} myAvatar={myAvatar} />);
    setUsers(resetMessage(user.username, users));
    refUser.current = user;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeadBarContainer handleDrawerToggle={handleDrawerToggle} />
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
