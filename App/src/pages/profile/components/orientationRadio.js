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

function OrientationRadio({ orientation, handleClick }) {
  const renderRadio = (name, label) => {
    return (
      <FormControlLabel
        value={label}
        control={
          <Radio
            id={name}
            checked={orientation === name}
            onClick={handleClick}
          />
        }
        label={label}
      />
    );
  };

  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Orientation</FormLabel>
      <RadioGroup row aria-label="gender" name="gender-radio">
        {renderRadio("bi", "Bisex")}
        {renderRadio("homo", "homo")}
        {renderRadio("hetero", "Hetero")}
      </RadioGroup>
    </FormControl>
  );
}
export default OrientationRadio;
