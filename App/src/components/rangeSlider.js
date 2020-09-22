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
  const [value, setValue] = React.useState([18, 75]);

  const handleChange = (event, newValue) => {
    onAgeChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        age
      </Typography>
      <Slider
        min={18}
        max={75}
        value={ageRange}
        onChange={onAgeChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
      />
    </div>
  );
}
