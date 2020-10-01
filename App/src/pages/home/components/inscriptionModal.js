import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiCall from "../../../api/api_request.js";
import ButtonLoader from "../../../common/components/buttonLoader.js";
import { INSCRIPTION_ROUTE } from "../../../api/routes.js";
import {
  checkMail,
  checkPassword,
  checkEqualPassword,
  checkUsername,
  checkName,
} from "../../../utils/checker.js";

/*
 ******************** CSS STYLE ********************
 */
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
/*
 ******************** utility Object ********************
 */
const utilValidation = {
  name: { callback: checkName, errorMessage: "nom non valide" },
  email: {
    callback: checkMail,
    errorMessage: "email non valide. seulement en minuscule",
  },
  password: {
    callback: checkPassword,
    errorMessage:
      "doit contenir au mois 8 charactere avec au minimum: une minuscule,  une majuscule, un chiffre, 1 charactere speciale",
  },
  firstname: { callback: checkName, errorMessage: "nom non valide" },
  username: {
    callback: checkUsername,
    errorMessage: "Login non valide",
  },
  confirmPwd: {
    callback: checkEqualPassword,
    errorMessage: "Les mots de passe ne correspondent pas",
  },
};
/*Generic function to change data*/

const changeData = (data, name, pair) => {
  let newData = { ...data };
  for (const [key, value] of Object.entries(pair)) {
    newData = { ...newData, [key]: { ...newData[key], [name]: value } };
  }
  return newData;
};

/*
 ******************** Initial State ********************
 */
const initialData = {
  value: {
    name: "",
    email: "",
    password: "",
    firstname: "",
    username: "",
    confirmPwd: "",
  },
  valid: {
    name: false,
    email: false,
    password: false,
    firstname: false,
    username: false,
    confirmPwd: false,
  },
  error: {
    name: " ",
    email: " ",
    password: " ",
    firstname: " ",
    username: " ",
    confirmPwd: " ",
  },
};

/*
 ******************** Component ********************
 */

export default function InscriptionModal({ open, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [err, setErr] = React.useState(null);
  const [data, setData] = React.useState(initialData);

  const [isfetching, setIsFetching] = React.useState(false);

  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      value: { ...data.value, [name]: value },
      valid: { ...data.valid, [name]: true },
      error: { ...data.error, [name]: " " },
    });
  };

  /*
   ** Front validation of Input
   */
  const checkValidations = () => {
    return (
      data.valid.name &&
      data.valid.email &&
      data.valid.password &&
      data.valid.firstname &&
      data.valid.username &&
      data.valid.confirmPwd
    );
  };

  /*
   ** Back validation of Input
   */
  const handleAPIResponse = (response) => {
    let body = response.data;
    const status = body.status;

    console.log("in handle API", response);
    if (status === 400) {
      setErr({ code: status, message: "value missing" });
    } else if (status === 401) {
      setData({
        ...data,
        error: { ...data.error, email: "Cette email est déjà utilisé" },
        valid: { ...data.valid, email: false },
      });
    } else if (status === 402) {
      setData({
        ...data,
        error: { ...data.error, username: "Cette login est déjà utilisé" },
        valid: { ...data.valid, username: false },
      });
    } else if (status === 403) {
      setErr({ code: status, message: "erreur mail non joignable" });
    } else {
      setErr(null);
    }
  };

  const onSubmit = () => {
    console.log(checkValidations());
    if (checkValidations()) {
      console.log("lalalaal");
      apiCall(
        INSCRIPTION_ROUTE,
        data.value,
        handleAPIResponse,
        null,
        setIsFetching
      );
    }
  };

  /*
   ** Function call on textField Losing focus
   ** if field is not empty and there is an error,show it
   */
  const handleBlur = (event) => {
    const { name, value } = event.target;
    console.log("ici");
    const error =
      name === "confirmPwd"
        ? !utilValidation[name].callback(data.value.password, value)
        : !utilValidation[name].callback(value);

    if (error) {
      setData({
        ...data,
        error: { ...data.error, [name]: utilValidation[name].errorMessage },
        valid: { ...data.valid, [name]: false },
      });
    }
  };

  /*
   ****************Renders Method
   */
  const renderTextField = (name, label) => {
    return (
      <TextField
        required
        id={name}
        label={label}
        value={data.value[name]}
        variant="outlined"
        name={name}
        error={!data.valid[name] && data.value[name]}
        helperText={data.error[name]}
        onChange={onInputChange}
        onBlur={handleBlur}
        // onFocus={handleFocus}
      />
    );
  };

  const renderError = () => {
    if (err) return <p>{err.message}</p>;
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
        <ButtonLoader
          fetching={isfetching}
          handleClick={onSubmit}
          buttonText="valider"
        />

        {renderError()}
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