import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatMessage from "./chatMessage.js";
const useStyles = makeStyles((theme) => ({
  box: {
    width: 300,
    border: "1px solid black",
  },
}));

function ChatBox({ notifs }) {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      {notifs.map((i, index) => {
        return <ChatMessage notif={i} key={index} />;
      })}
    </div>
  );
}

export default ChatBox;
