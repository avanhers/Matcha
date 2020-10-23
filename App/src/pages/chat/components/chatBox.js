import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatMessage from "./chatMessage.js";
import List from "@material-ui/core/List";
import ChatText from "./chatText.js";
import Paper from "@material-ui/core/Paper";
import { GET_MESSAGE } from "../../../api/routes.js";
import { apiCallGet } from "../../../api/api_request.js";
import io from "socket.io-client";

let socket;
const useStyles = makeStyles((theme) => ({
  box: {
    backGrounColor: "#F9F7F7",
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 450,
  },
  myPaper: {
    backgroundColor: "#F9F7F7",
  },
}));

const testMessage = [
  {
    send: null,
    message: "Erreur information",

    sendAt: "11:02",
  },
];
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function myFunction() {
  var d = new Date();
  console.log("date", d);
  var x = document.getElementById("demo");
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return h + ":" + m + ":" + s;
}

function ChatBox({ user, myAvatar }) {
  const [listMess, setListMess] = React.useState(testMessage);

  const classes = useStyles();

  useEffect(() => {
    const socket = io("http://localhost", {
      path: "/api/salut",
      query: { token: JSON.parse(localStorage.getItem("x-refresh-token")) },
    });
    //console.log(socket);
    apiCallGet(GET_MESSAGE + "/" + user.username, sucessCall, null, null, null);
  }, [user]);

  const sucessCall = (response) => {
    setListMess(response.data.messages);
  };

  const handleSubmit = (data) => {
    const newMess = [...listMess];
    console.log(data);
    newMess.push({
      send: 1,
      message: data,
      sendAt: "aaaaaaaaaaa" + myFunction(),
    });
    setListMess(newMess);
  };

  const renderListMessage = () => {
    if (listMess[0]) {
      return (
        <div className={classes.box}>
          <List className={classes.root}>
            <ul>
              {listMess.map((i, index) => {
                return (
                  <li key={index}>
                    <ChatMessage
                      message={i}
                      avatar={i.send === null ? user.avatar : myAvatar}
                    />
                  </li>
                );
              })}
            </ul>
          </List>
        </div>
      );
    } else return <div>Envoie un message pour demarrer la converstion</div>;
  };

  return (
    <div>
      {renderListMessage()}

      <Paper className={classes.myPaper}>
        <ChatText handleSubmit={handleSubmit} />
      </Paper>
    </div>
  );
}

export default ChatBox;