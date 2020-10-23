import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import { fade, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function ChatText() {
  const [data, setData] = React.useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setData(e.value);
  };
  const handleSubmit = () => {
    console.log("submit");
  };

  const renderTextField = (name, label) => {
    return (
      <div style={{ paddingTop: "10px" }}>
        <TextField
          className={classes.root}
          style={{ width: "70%" }}
          required
          id={name}
          rows={4}
          label={label}
          multiline={true}
          value={data}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <form>
      {renderTextField()}
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          envoyer
        </Button>
      </div>
    </form>
  );
}

export default ChatText;
