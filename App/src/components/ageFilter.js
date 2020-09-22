import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 220,
    paddingLeft: 15,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function AgeFilter({ ageRange, onAgeChange }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    onAgeChange(event, newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        age : {ageRange[0]} - {ageRange[1]}
      </Typography>
      <Slider
        min={18}
        max={75}
        value={ageRange}
        onChange={handleChange}
        aria-labelledby="range-slider"
      />
    </div>
  );
}
