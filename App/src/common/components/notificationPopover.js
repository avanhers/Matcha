import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListNotification from "./listNotification";
import ChatBox from "./chatBox.js";
import ChatMessage from "./chatMessage.js";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  box: {
    width: 300,
    border: "1px solid black",
  },
}));

export default function NotificationPopover({ anchorEl, handleClose, notifs }) {
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.box}>
          {notifs.map((i, index) => {
            return <ChatMessage notif={i} key={index} />;
          })}
        </div>
      </Popover>
    </div>
  );
}
