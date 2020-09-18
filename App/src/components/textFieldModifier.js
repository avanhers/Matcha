import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import { TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function TextFieldModifier({ fieldName, fieldValue, textArea }) {
  const classes = useStyles();
  const [focusOn, setFocusOn] = React.useState(false);
  const toggleFocus = () => {
    setFocusOn(!focusOn);
  };

  const handleBlur = () => {
    setFocusOn(false);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        style={textArea ? { width: "80%" } : {}}
        multiline={textArea ? true : false}
        variant={textArea ? "outlined" : "standard"}
        placeholder={fieldName}
        defaultValue={fieldValue}
        disabled={!focusOn}
        label={fieldName}
        inputProps={{ "aria-label": "description" }}
        inputRef={(input) => input && focusOn && input.focus()} //handle Focus
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
      />
      <IconButton onClick={toggleFocus}>
        <CreateIcon />
      </IconButton>
    </form>
  );
}
export default TextFieldModifier;
