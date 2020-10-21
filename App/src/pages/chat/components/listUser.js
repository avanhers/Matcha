import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
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
}));

const myMatch = [
  {
    username: "toto",
    avatar: profilPlaceholder,
  },
  {
    username: "tata",
    avatar: profilPlaceholder,
  },
  {
    username: "tutu",
    avatar: profilPlaceholder,
  },
];

function renderProfilPicture(url) {
  return (
    <Avatar
      alt="Avatar"
      src={url}
      sizes="large"
      style={{ height: "20%", width: "20%", textAlign: "-webkit-center" }}
    />
  );
}

export default function ListUser() {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <Typography>Conversation</Typography>
      <li key="Newmessage" className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>Nouveau Message</ListSubheader>
          {myMatch.map((item) => (
            <ListItem button key={item.username}>
              <Avatar
                alt="Avatar"
                src={item.avatar}
                sizes="large"
                style={{
                  height: "auto",
                  width: "75%",
                  textAlign: "-webkit-center",
                }}
              />
              <ListItemText primary={item.username} />
            </ListItem>
          ))}
        </ul>
      </li>
      <li key="NewConversation" className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>Nouvelle Conversation</ListSubheader>
          <ListItem button key="salut">
            <ListItemText primary="toto" />
          </ListItem>
        </ul>
      </li>
    </List>
  );
}
