import React, { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ChatMessage from "./chatMessage.js";
import List from "@material-ui/core/List";
import ChatText from "./chatText.js";
import Paper from "@material-ui/core/Paper";
import { GET_MESSAGE, BASE_SOCKET_URL } from "../../../api/routes.js";
import { apiCallGet } from "../../../api/api_request.js";

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

const messageHandler = (message, mess) => {
  const newMess = [...mess];
  newMess.push({
    send: null,
    message: message.msg,
    sendAt: new Date(),
  });
  return newMess;
};

function ChatBox({ user, myAvatar }) {
  const [listMess, setListMess] = React.useState(testMessage);
  const socket = useStore().getState().socket;
  const classes = useStyles();

  const [connected, setConnected] = React.useState(false);

  const ref = useRef(listMess);
  const refUser = useRef(user.username);
  const listRef = useRef(null); // for scroll
  const handler = (message) => {
    if (refUser.current === message.from)
      setListMess(messageHandler(message, ref.current));
  };

  // UseEffect call one time for socket connection
  useEffect(() => {
    if (socket) {
      socket.on("message", handler);
      setConnected(true);
    }
    return () => {
      socket.off("message", handler);
      setConnected(false);
    };
  }, []);

  // UseEffect call everytime to change reference value
  useEffect(() => {
    ref.current = listMess;
    if (listRef.current) listRef.current.scrollIntoView();
  });

  useEffect(() => {
    apiCallGet(GET_MESSAGE + "/" + user.username, sucessCall, null, null, null);
    refUser.current = user.username;
  }, [user]);

  const sucessCall = (response) => {
    setListMess(response.data.messages);
  };

  const handleSubmit = (data) => {
    const newMess = [...listMess];
    newMess.push({
      send: 1,
      message: data,
      sendAt: new Date(),
    });
    socket.emit("message", {
      username: user.username,
      msg: data,
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
            <div ref={listRef}></div>
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
