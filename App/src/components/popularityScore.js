import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Fab from "@material-ui/core/Fab";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
  },
  fabProgress: {
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
});

function PopularityScore({ score }) {
  const classes = useStyles();
  const col = score === 100 ? 900 : Math.trunc(score / 10) * 100;
  console.log(col);
  return (
    <div className={classes.wrapper}>
      <Fab aria-label="save">
        <WhatshotIcon style={{ color: red[col] }} />
      </Fab>
      <CircularProgress
        className={classes.fabProgress}
        style={{ color: red[col] }}
        variant="static"
        value={score}
        size={68}
      />
    </div>
  );
}

export default PopularityScore;
