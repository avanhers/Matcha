import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  if (item.substr(0, 5) !== "https") {
    return "http://localhost/api".concat(item.slice(7));
  } else return item;
};

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function getHour(date) {
  var d = new Date(date);
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return h + ":" + m + ":" + s;
}

function ChatMessage({ message, avatar }) {
  const classes = useStyles();
  const img = formatImage(avatar);

  const renderSend = () => {
    return (
      <div className={classes.messageContainerRight}>
        <img className={classes.imgright} src={img} alt="avatar" />

        <p>{message.message}</p>
        <span className={classes.timeLeft}>{getHour(message.sendAt)}</span>
        {/* </div> */}

        <div style={{ content: "", clear: "both", display: "table" }}></div>
      </div>
    );
  };

  const renderReceive = () => {
    return (
      <div className={classes.messageContainerLeft}>
        <img className={classes.imgleft} src={img} alt="avatar" />
        <p>{message.message}</p>
        <span className={classes.timeRight}>{getHour(message.sendAt)}</span>

        <div style={{ content: "", clear: "both", display: "table" }}></div>
      </div>
    );
  };

  return message.send === null ? renderReceive() : renderSend();
}

export default ChatMessage;
