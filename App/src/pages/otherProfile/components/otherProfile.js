import React, { useEffect, useRef } from "react";
import MainOtherProfile from "./mainOtherProfile.js";

import HeadBar from "../../../common/components/headBar.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
}));

function OtherProfile({ match, socket }) {
  const classes = useStyles();
  const [mainComponent] = React.useState(
    <MainOtherProfile match={match} socket={socket} />
  );
  const refSocket = useRef(false);

  useEffect(() => {
    if (socket && !refSocket.current) {
      refSocket.current = true;
      socket.emit("notification", {
        type: "view",
        target: match.params.username,
      });
    }
  }, [socket]);

  return (
    <div className={classes.root}>
      <HeadBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainComponent}
      </main>
    </div>
  );
}

export default OtherProfile;
