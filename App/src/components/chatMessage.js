import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  messageContainerLeft: {
    textAlign: "-webkit-left",
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  messageContainerRight: {
    textAlign: "-webkit-right",
    textAlign: "-webkit-left",
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
    maxWidth: "30px",
    width: "100%",
    marginRight: "20px",
    borderRadius: "50%",
  },
  imgright: {
    float: "right",
    maxWidth: "30px",
    width: "100%",
    borderRadius: "50%",
    marginLeft: "20px",
    marginRight: "0",
  },
}));
//message:{user,text}

function ChatMessage({ message }) {
  const classes = useStyles();

  //   const chooseClasseParent = () => {
  //     return message.user === 0
  //       ? classes.messageContainerLeft
  //       : classes.messageContainerRight;
  //   };

  //   const chooseClasseChild = () => {
  //     return message.user === 0 ? classes.messageLeft : classes.messageRight;
  //   };
  const renderSend = () => {
    return (
      <div className={classes.messageContainerRight}>
        {/* <div className={classes.messageRight}> */}
        <img className={classes.imgright} src={message.image} alt="avatar" />
        <p>{message.text}</p>
        <span class={classes.timeLeft}>{message.time}</span>
        {/* </div> */}

        <div style={{ content: "", clear: "both", display: "table" }}></div>
      </div>
    );
  };

  const renderReceive = () => {
    return (
      <div className={classes.messageContainerLeft}>
        {/* <div className={classes.messageLeft}> */}
        <img className={classes.imgleft} src={message.image} alt="avatar" />
        <p>{message.text}</p>
        <span class={classes.timeRight}>{message.time}</span>

        <div style={{ content: "", clear: "both", display: "table" }}></div>
      </div>
    );
  };

  return message.user === 0 ? renderReceive() : renderSend();
}

export default ChatMessage;
