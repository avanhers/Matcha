import React, { useEffect } from "react";
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

export default function ListUser({ users, handleClickUser }) {
  const classes = useStyles();

  const renderAvatar = (user) => {
    if (user.isLogin)
      return (
        <Badge
          classes={{ badge: classes.badge }}
          color="primary"
          badgeContent=" "
          variant="dot"
        >
          {user.nbMess ? (
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              color="secondary"
              badgeContent="2"
            />
          ) : (
            ""
          )}
          <Avatar alt="Avatar" src={user.avatar} sizes="large" />
        </Badge>
      );
    else return <Avatar alt="Avatar" src={user.avatar} sizes="large" />;
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
