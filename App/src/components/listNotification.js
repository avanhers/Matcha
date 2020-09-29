import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const notifications = [
  {
    userimage:
      "https://e-cours-arts-plastiques.com/wp-content/uploads/2012/12/P1040970.jpg",
    notifType: " vue ",
  },
  {
    userimage:
      "https://e-cours-arts-plastiques.com/wp-content/uploads/2012/12/P1040970.jpg",
    notifType: " like ",
  },
  {
    userimage:
      "https://e-cours-arts-plastiques.com/wp-content/uploads/2012/12/P1040970.jpg",
    notifType: " unlike ",
  },
];

export default function ListNotification() {
  const classes = useStyles();

  const renderList = () => {
    return notifications.map((item, index) => {
      return (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar src={item.userimage} />
          </ListItemAvatar>
          <ListItemText primary={"a " + item.notifType + " votre profil"} />
        </ListItem>
      );
    });
  };
  return <List className={classes.root}>{renderList()}</List>;
}
