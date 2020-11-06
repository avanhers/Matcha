import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import useDebounceRequest from "../../../common/useDebounceRequest.js";

const useStyles = makeStyles({
  root: {
    width: 220,
    paddingLeft: 15,
  },
});


export default function PopularityFilter({ onPopularityChange }) {
  const classes = useStyles();
  const [popularity, setPopularity] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    // onPopularityChange(event, newValue);
    console.log("in change popularity");
    setPopularity(newValue);
  };

  const testFunction = (text) => {
    console.log("text : ", text);
    onPopularityChange(text);
    // return "good";
  };
  useDebounceRequest(testFunction, popularity);

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        popularity : {popularity[0]} - {popularity[1]}
      </Typography>
      <Slider
        style={{ width: "85%" }}
        min={0}
        max={100}
        value={popularity}
        onChange={handleChange}
        aria-labelledby="range-slider"
      />
    </div>
  );
}
