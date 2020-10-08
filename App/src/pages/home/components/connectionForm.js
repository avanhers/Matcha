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
/*
 ******************** CSS STYLE ********************
 */

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    height: 250,
    justifyContent: "space-around",
  },
  passwordReset: {
    color: "blue",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
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
  },
  errorConfig: ["blur", "submitted"],
};

/*
 ******************** Component ********************
 */
export default function ConnectionForm({
  userRequest,
  getUser,
  requestUser,
  setSnackBar,
  changeModalTypeOpened,
}) {
  console.log("in conn");
  const classes = useStyles();
  const [fetching, setFetching] = React.useState(false);

  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  const onSuccessApi = (response) => {
    console.log(response);
    if (response.data.status === 200) getUser(response.data.user);
    if (response.data.status === 401)
      setSnackBar("valide ton compte connard !", "error");
    if (response.data.status === 402)
      setSnackBar(
        "tas demander a changer ton mot de passe et apres tu te repointe ici en croyant aue ca va marcher tu tes cru ou !",
        "error"
      );
    if (response.data.status === 403)
      setSnackBar("tes donnees sont pas bonnes!", "error");
  };

  const onSubmit = (data) => {
    apiCall(
      CONNEXION_ROUTE,
      { username: data.username, password: data.password },
      onSuccessApi,
      null,
      setFetching,
      "POST",
      false
    );
  };

  const renderTextField = (name, label, type) => {
    return (
      <TextField
        required
        id={name}
        label={label}
        variant="outlined"
        type={type}
        error={showError(name) && !!errors[name]}
        helperText={showError(name) && errors[name]}
        {...getFieldProps(name)}
      />
    );
  };

  const handlePasswordResetClick = () => {
    changeModalTypeOpened("resetPassword");
  };

  const renderMdpOublie = () => {
    return (
      <div>
        {/* <Link component={RouterLink} variant="body2" to="/profil">
          {"mot de passe oublié"}
        </Link> */}
        {
          <p
            className={classes.passwordReset}
            variant="body2"
            component={RouterLink}
            onClick={handlePasswordResetClick}
          >
            Mot de passe oublié
          </p>
        }
      </div>
    );
  };

  return (
    <div>
      <h2 id="simple-modal-title">Connexion</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formContainer}>
          {renderTextField("username", "Login", "text")}
          {renderTextField("password", "Mdp", "password")}
          {renderMdpOublie()}
        </div>
        {fetching ? (
          <CircularProgress />
        ) : (
          <Button variant="outlined" onClick={() => onSubmitVal(onSubmit)}>
            Valider
          </Button>
        )}
      </form>
    </div>
  );
}
