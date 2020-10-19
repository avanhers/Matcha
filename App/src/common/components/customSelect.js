import { MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: (minWidth) => ({
    margin: theme.spacing(1),
    minWidth: minWidth ? minWidth : 120,
  }),
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
}));

function CustomSelect({
  userKey,
  fieldName,
  fieldValue,
  fieldChoice,
  handleChange,
  minWidth = 120,
}) {
  const classes = useStyles(minWidth);

  const handleSelectChange = (event) => {
    console.log(fieldName, event.target.value, "pasteque");
    handleChange(userKey, event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={fieldName}>{fieldName}</InputLabel>
        <Select
          labelId={fieldName}
          id="demo-simple-select"
          value={fieldValue}
          onChange={handleSelectChange}
        >
          {fieldChoice.map((field, index) => (
            <MenuItem key={index} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomSelect;
