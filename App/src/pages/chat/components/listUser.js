import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 1000,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  badge: {
    backgroundColor: "#0AF40A",
    color: "white",
  },
}));

const formatImage = (item) => {
  if (item && item.substr(0, 5) !== "https") {
    return "http://localhost/api".concat(item.slice(7));
  } else return item;
};

const renderOnlineMessage = (user, classes) => {
  return (
    <Badge
      classes={{ badge: classes.badge }}
      color="primary"
      badgeContent=" "
      variant="dot"
    >
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        color="secondary"
        badgeContent={user.unreadMessages}
      />
      <Avatar alt="Avatar" src={formatImage(user.avatar)} sizes="large" />
    </Badge>
  );
};
const renderOnlineNoMessage = (user, classes) => {
  return (
    <Badge
      classes={{ badge: classes.badge }}
      color="primary"
      badgeContent=" "
      variant="dot"
    >
      <Avatar alt="Avatar" src={formatImage(user.avatar)} sizes="large" />
    </Badge>
  );
};

const renderOfflineNoMessage = (user) => {
  return <Avatar alt="Avatar" src={formatImage(user.avatar)} sizes="large" />;
};

const renderOfflineMessage = (user) => {
  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      color="secondary"
      badgeContent={user.unreadMessages}
    >
      <Avatar alt="Avatar" src={formatImage(user.avatar)} sizes="large" />
    </Badge>
  );
};

export default function ListUser({ users, handleClickUser }) {
  const classes = useStyles();

  const renderAvatar = (user) => {
    if (user.isLogin && user.unreadMessages) {
      return renderOnlineMessage(user, classes);
    } else if (user.isLogin) return renderOnlineNoMessage(user, classes);
    else if (user.unreadMessages) return renderOfflineMessage(user);
    else return renderOfflineNoMessage(user);
  };

  return (
    <List className={classes.root} subheader={<li />}>
      <Typography>Conversation</Typography>
      <li key="Newmessage" className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>Nouveau Message</ListSubheader>
          {users.map((item) => (
            <ListItem
              button
              key={item.username}
              onClick={() => handleClickUser(item)}
            >
              {renderAvatar(item)}
              <ListItemText primary={item.username} />
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}

// function UserAvatar({badgeOnline,badgeMessage}) {
//   if()
// }
