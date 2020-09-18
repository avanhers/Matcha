import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { findByLabelText } from "@testing-library/react";
import axios from "axios";

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
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function ConnectionModal({ open, handleClose, setUser }) {
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
    axios
      .post("http://localhost/auth/inscription", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        let err = response.data.error;
        if (err) console.log("Error message", err);
        console.log(response);
        setUser({ name: "banane", password: "test" });
      })
      .catch((error) => {
        setUser({ name: "banane", password: "test" });
      });
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Connexion</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.formContainer}>
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
        </div>
        <Button variant="outlined" onClick={onSubmit}>
          Valider
        </Button>
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
