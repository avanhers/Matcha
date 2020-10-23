import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  messageContainerLeft: {
    textAlign: "-webkit-left",
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    // padding: "10px",
    // margin: "10px 0",
  },
  messageContainerRight: {
    textAlign: "-webkit-right",
    borderColor: "#ccc",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  messageLeft: {
    textAlign: "left",
    width: "fit-content",
  },
  messageRight: {
    textAlign: "right",
    width: "fit-content",
  },
  timeRight: {
    float: "right",
    color: "#aaa",
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
  imgright: {
    float: "right",
    maxWidth: "50px",
    width: "100%",
    borderRadius: "50%",
    marginLeft: "20px",
    marginRight: "0",
  },
}));
//message:{user,text}
const formatImage = (item) => {
  if (item.substr(0, 5) != "https") {
    return "http://localhost/api".concat(item.slice(7));
  } else return item;
};

const notifMessageMap = {
  like: " vous a liké !",
  match: " vous a matché !",
  vew: " a vu votre profil !",
};

function ChatMessage({ notif }) {
  const classes = useStyles();

  const renderSend = () => {
    return (
      <div className={classes.messageContainerRight}>
        <p>{notif.from + notifMessageMap[notif.type]}</p>
        <span className={classes.timeLeft}></span>

        <div style={{ content: "", clear: "both", display: "table" }}></div>
      </div>
    );
  };

  return renderSend();
}

export default ChatMessage;
