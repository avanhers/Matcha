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

function valuetext(value) {
  return `${value}°C`;
}

export default function AgeFilter({ ageRange, onAgeChange }) {
  const classes = useStyles();
  const [age, setAge] = React.useState([18, 75]);

  const handleChange = (event, newValue) => {
    // onAgeChange(event, newValue);
    setAge(newValue);
  };

  const testFunction = (text) => {
    console.log("text : ", text);
    onAgeChange(text);
    // return "good";
  };
  const test = useDebounceRequest(testFunction, age);

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        age : {age[0]} - {age[1]}
      </Typography>
      <Slider
        min={18}
        max={75}
        value={age}
        onChange={handleChange}
        aria-labelledby="range-slider"
      />
    </div>
  );
}
