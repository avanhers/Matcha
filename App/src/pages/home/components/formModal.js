import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import apiCall from "../../../api/api_request";
import { CONNEXION_ROUTE, PASSWORD_RESET_ROUTE } from "../../../api/routes.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useValidation from "../../../common/validator/validatorHook.js";
import InscriptionForm from "./inscriptionForm.js";
import ConnectionForm from "./connectionForm.js";
import PasswordResetForm from "./passwordResetForm.js";
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
}));

/*
 ******************** Validator configureur ********************
 */

const validatorConfig = {
  fields: {
    username: {
      required: { message: "Ce champs est obligatoire" },
      minLength: {
        value: 3,
        message: "Votre username doit contenir au moins 3 caractère",
      },
      checkUsername: {
        message: "Votre nom d'utilisateur ne doit contenir que des minuscules",
      },
    },
    password: {
      required: { message: "Ce champs est obligatoire" },
      checkPassword: {
        message:
          "Le mot de passe doit contenir au mois 8 charactere avec au minimum: une minuscule,  une majuscule, un chiffre, 1 charactere speciale",
      },
    },
    email: {
      required: { message: "Ce champs est obligatoire" },
      checkMail: { message: "Ceci n'est pas une adresse mail valide" },
    },
  },
  errorConfig: ["blur", "submitted"],
};

/*
 ******************** Component ********************
 */
export default function FormModal({
  open,
  onClose,
  type,
  setSnackBar,
  getUser,
  changeModalTypeOpened,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [typeModal, setType] = React.useState(type);
  const typeModalMap = {
    connection: (
      <ConnectionForm
        setSnackBar={setSnackBar}
        getUser={getUser}
        changeModalTypeOpened={changeModalTypeOpened}
      />
    ),
    inscription: <InscriptionForm setSnackBar={setSnackBar} />,
    resetPassword: (
      <PasswordResetForm
        setSnackBar={setSnackBar}
        changeModalTypeOpened={changeModalTypeOpened}
      />
    ),
  };
  return (
    <div>
      <Modal
        open={open}
        onBackdropClick={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {typeModalMap[type]}
        </div>
      </Modal>
    </div>
  );
}
