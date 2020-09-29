import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const checkPassword = (passwd, passwd2) => passwd === passwd2;

export default function InscriptionModal({ open, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [err, setErr] = React.useState(0);
  const data = {};

  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    data[event.target.name] = event.target.value;
  };

  const onSubmit = () => {
    // validation des champs
    //passwd same
    //
    console.log(checkPassword(data.password, data.confirmPwd));
    console.log(data);
    console.log("submit");
    delete data.confirmPwd;
    axios
      .post("http://localhost/api/auth/inscription", data)
      .then((response) => {
        let body = response.data;
        console.log(response);
        const status = body.status;
        if (status != 0) setErr(status);
        if (status === 201)
          //redirected home with popup
          console.log("redirection");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderTextField = (name, label) => {
    return (
      <TextField
        required
        id="outlined-required"
        label={label}
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
          {renderTextField("email", "Adresse email")}
          {renderTextField("name", "Nom")}
          {renderTextField("firstname", "Prenom")}
          {renderTextField("password", "Mdp")}
          {renderTextField("confirmPwd", "Confirmer Mdp")}
          {renderTextField("username", "login")}
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
