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

export default function DistanceFilter({ onDistanceChange }) {
  const classes = useStyles();
  const [distance, setDistance] = React.useState(20000);

  const handleChange = (event, newValue) => {
    setDistance(newValue);
  };

  const testFunction = (text) => {
    onDistanceChange(text);
  };
  useDebounceRequest(testFunction, distance);

  const distanceText = (value) => {
    return `${value}`;
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Distance Max (Km)
      </Typography>
      <Slider
        style={{ width: "85%" }}
        max={20000}
        value={distance}
        // getAriaValueText={distanceText}
        valueLabelFormat={distanceText}
        onChange={handleChange}
        aria-labelledby="discrete-slider-always"
        valueLabelDisplay="on"
      />
    </div>
  );
}
