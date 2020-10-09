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

function OrientationRadio() {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Orientation</FormLabel>
      <RadioGroup row defaultValue="Bi" aria-label="gender" name="gender-radio">
        <FormControlLabel value="bi" control={<Radio />} label="Bi" />
        <FormControlLabel value="hetero" control={<Radio />} label="Hetero" />
        <FormControlLabel value="homo" control={<Radio />} label="Homo" />
      </RadioGroup>
    </FormControl>
  );
}
export default OrientationRadio;
