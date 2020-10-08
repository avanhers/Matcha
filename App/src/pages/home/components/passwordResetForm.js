import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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
    height: 150,
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
export default function PasswordResetForm({
  userRequest,
  getUser,
  requestUser,
  setSnackBar,
  changeModalTypeOpened,
}) {
  const classes = useStyles();
  const [fetching, setFetching] = React.useState(false);

  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  const onSuccessAPIpassword = (response) => {
    if (response.data.status === 201)
      setSnackBar(
        "Un email vous a été envoyer check tes mails batard !",
        "success"
      );
    else if (response.data.status === 402)
      setSnackBar(
        "Un probleme a ete detecte ques t'essai de nous faire petit salopiaud !",
        "error"
      );
    else if (response.data.status === 401)
      setSnackBar("connais pas !", "error");
  };

  const onSubmit = (data) => {
    apiCall(
      PASSWORD_RESET_ROUTE,
      data,
      onSuccessAPIpassword,
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
    changeModalTypeOpened("connection");
  };

  const renderMdpOublie = () => {
    return (
      <div>
        {
          <IconButton
            onClick={handlePasswordResetClick}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <ArrowBackIcon />
          </IconButton>
        }
      </div>
    );
  };

  return (
    <div>
      <h2 id="simple-modal-title">{"Reinitialiser mom mot de passe"}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formContainer}>
          {renderTextField("email", "Email", "email")}
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
