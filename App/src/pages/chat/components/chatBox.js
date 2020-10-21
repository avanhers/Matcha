import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatMessage from "./chatMessage.js";
import List from "@material-ui/core/List";
import ChatText from "./chatText.js";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid black",
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 1000,
  },
  myPaper: {
    backgroundColor: "#F9F7F7",
  },
}));

const testMessage = [
  {
    user: 0,
    text:
      "salut cfsdssssssssss ddddddddddfdfhjkfghfkjghsfk jghfkgjsdhgkj sdghsdkjg",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:02",
  },
  {
    user: 1,
    text: "yo",
    image:
      "https://tipatate.bzh/wp-content/uploads/2015/06/insigne_ti_patate_fond_noir.png",
    time: "11:11",
  },
  {
    user: 1,
    text: "ca va?",
    image:
      "https://tipatate.bzh/wp-content/uploads/2015/06/insigne_ti_patate_fond_noir.png",
    time: "11:11",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
  {
    user: 0,
    text: "Oui",
    image: "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    time: "11:12",
  },
];

function ChatBox() {
  const [listMess, setListMess] = React.useState(testMessage);
  const classes = useStyles();

  return (
    <div>
      <div className={classes.box}>
        <List className={classes.root}>
          <li key="NewConversation">
            <ul>
              {listMess.map((i, index) => {
                return <ChatMessage message={i} />;
              })}
            </ul>
          </li>
        </List>
      </div>
      <Paper className={classes.myPaper}>
        <ChatText />
      </Paper>
    </div>
  );
}

export default ChatBox;
