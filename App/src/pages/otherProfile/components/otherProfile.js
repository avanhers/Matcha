import React from "react";
import MainOtherProfile from "./mainOtherProfile.js";
import CssBaseline from "@material-ui/core/CssBaseline";

import HeadBar from "../../profile/components/headBar.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
  },
}));

function OtherProfile({ match }) {
  const classes = useStyles();

  const [mainComponent, setMainComponent] = React.useState(
    <MainOtherProfile match={match} />
  );

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
