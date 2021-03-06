import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

/*
 ********************** Component *****************************
 */

function GenderRadio({ gender, handleClick }) {
  /********         START OF RENDERING            ********/
  const renderRadio = (name, label) => {
    return (
      <FormControlLabel
        value={label}
        control={
          <Radio id={name} checked={gender === name} onClick={handleClick} />
        }
        label={label}
      />
    );
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Genre</FormLabel>
      <RadioGroup
        row
        defaultValue="femmme"
        aria-label="gender"
        name="gender-radio"
      >
        {renderRadio("female", "Femme")}
        {renderRadio("male", "Homme")}
      </RadioGroup>
    </FormControl>
  );
}
export default GenderRadio;
