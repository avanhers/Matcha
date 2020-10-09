import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "inline",
    horizontalAlign: "middle",
  },
}));

function GenderRadio() {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Genre</FormLabel>
      <RadioGroup
        row
        defaultValue="female"
        aria-label="gender"
        name="gender-radio"
      >
        <FormControlLabel value="femme" control={<Radio />} label="Femme" />
        <FormControlLabel value="homme" control={<Radio />} label="Homme" />
      </RadioGroup>
    </FormControl>
  );
}
export default GenderRadio;
