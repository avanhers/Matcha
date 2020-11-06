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



export default function AgeFilter({ ageMin, ageMax, onAgeChange }) {
  const classes = useStyles();
  const [age, setAge] = React.useState([18, 75]);

  const handleChange = (event, newValue) => {
    setAge(newValue);
  };

  const testFunction = (text) => {
    onAgeChange(text);
  };
  useDebounceRequest(testFunction, age);

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        age : {age[0]} - {age[1]}
      </Typography>
      <Slider
        style={{ width: "85%" }}
        min={18}
        max={75}
        value={age}
        onChange={handleChange}
        aria-labelledby="range-slider"
      />
    </div>
  );
}
