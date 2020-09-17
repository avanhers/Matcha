import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { findByLabelText } from "@testing-library/react";

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
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function InscriptionModal({ open, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

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

  const renderTextField = (name) => {
    return (
      <TextField
        required
        id="outlined-required"
        label={name}
        defaultValue=""
        variant="outlined"
        name={name}
        onChange={onInputChange}
      />
    );
  };

  //body that will be print in render
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
          {renderTextField("Adresse email")}
          {renderTextField("Mdp")}
          {renderTextField("Confirmer Mdp")}
        </div>
        <Button variant="outlined" onClick={onSubmit}>
          Valider
        </Button>
      </form>
    </div>
  );

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
