import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatMessage from "./chatMessage.js";
const useStyles = makeStyles((theme) => ({
  box: {
    height: 500,
    width: 300,
    border: "1px solid black",
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
];

function ChatBox() {
  const [listMess, setListMess] = React.useState(testMessage);
  const classes = useStyles();

  return (
    <div className={classes.box}>
      {listMess.map((i, index) => {
        return <ChatMessage message={i} />;
      })}
    </div>
  );
}

export default ChatBox;
