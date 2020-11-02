import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  messageContainerRight: {
    textAlign: "-webkit-right",
    borderColor: "#ccc",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  messageRight: {
    textAlign: "right",
    width: "fit-content",
  },
  timeLeft: {
    float: "left",
    color: "#999",
  },
  imgleft: {
    float: "left",
    maxWidth: "50px",
    width: "100%",
    marginRight: "20px",
    borderRadius: "50%",
  },
}));

const notifMessageMap = {
  like: " vous a liké !",
  match: " vous a matché !",
  view: " a vu votre profil !",
};

function ChatMessage({ notif }) {
  const classes = useStyles();

  return (
    <div className={classes.messageContainerRight}>
      <p>{notif.emitter + notifMessageMap[notif.type]}</p>
      <span className={classes.timeLeft}></span>

      <div style={{ content: "", clear: "both", display: "table" }}></div>
    </div>
  );
}

export default ChatMessage;
