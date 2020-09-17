import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConnectionModal({ open, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //   const [opened, setOpened] = React.useState(open);
  const data = { email: "", password: "" };

  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    data[event.target.name] = event.target.value;
  };

  const onSubmit = () => {
    console.log(data);
    console.log("submit");
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Connexion</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-required"
          label="Addresse Email"
          defaultValue=""
          variant="outlined"
          name="email"
          onChange={onInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Mot de passe"
          defaultValue=""
          variant="outlined"
          name="password"
          onChange={onInputChange}
        />
        <Button onClick={onSubmit}>patate</Button>
      </form>
    </div>
  );
  const backDropClickHandler = () => {
    console.log("backdrop");
  };
  return (
    <div>
      <Modal
        open={open}
        onBackdropClick={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
