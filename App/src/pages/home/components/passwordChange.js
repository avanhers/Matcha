import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import apiCall from "../../../api/api_request";
import { PASSWORD_CHANGE_ROUTE } from "../../../api/routes.js";
import useValidation from "../../../common/validator/validatorHook.js";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SportsKabaddiOutlinedIcon from "@material-ui/icons/SportsKabaddiOutlined";
import { Redirect } from "react-router-dom";
/*
 ******************** CSS STYLE ********************
 */

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 500,
    margin: "auto",
    paddingTop: 100,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    height: 45,
  },
}));

/*
 ******************** Validator configureur ********************
 */

const validatorConfig = {
  fields: {
    password: {
      required: { message: "Ce champs est obligatoire" },
      checkPassword: {
        message:
          "Le mot de passe doit contenir au moins 8 caractères avec au minimum: une minuscule,  une majuscule, un chiffre, 1 caractère special",
      },
    },
    confirmPwd: {
      required: { message: "Ce champs est obligatoire" },
      checkEqualPassword: (fieldsValue) => {
        return {
          value: fieldsValue.password,
          message: "Les mots de passe ne correspondent pas",
        };
      },
    },
  },

  errorConfig: ["blur", "submitted"],
};

/*
 ******************** Component ********************
 */
export default function PasswordChangeForm({ setSnackBar, location }) {
  const classes = useStyles();
  const [fetching, setFetching] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState("");

  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  const onErrorAPI = (response) => {
    console.log(response);
  };

  const onSuccessAPI = (response) => {
    if (response.data.status === 201)
      setSnackBar("Votre mot de passe à été modifié avec succès", "success");
    else
      setSnackBar(
        "Un probleme a ete detecte ques t'essai de nous faire petit salopiaud !",
        "error"
      );
    console.log("on sucess changePassword");
    setRedirectPath("/");
  };

  const onSubmit = (data) => {
    const userId = location.state.userId;
    const dataSent = { password: data.password, userId: userId };
    apiCall(
      PASSWORD_CHANGE_ROUTE,
      dataSent,
      onSuccessAPI,
      onErrorAPI,
      setFetching,
      "POST",
      false
    );
  };

  const renderTextField = (name, label, type) => {
    return (
      <TextField
        required
        fullWidth
        id={name}
        label={label}
        variant="outlined"
        type={type}
        error={showError(name) && !!errors[name]}
        helperText={(showError(name) && errors[name]) || " "}
        {...getFieldProps(name)}
      />
    );
  };

  return (
    <div className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <SportsKabaddiOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Réinitialisation du mot de passe
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(event) => onSubmitVal(event, onSubmit)}
      >
        {renderTextField("password", "Mot de passe", "password")}
        {renderTextField(
          "confirmPwd",
          "Confirmation du mot de passe",
          "password"
        )}
        <Button
          className={classes.submit}
          variant="contained"
          fullWidth
          color="primary"
          type="submit"
          startIcon={fetching && <CircularProgress color="inherit" />}
        >
          {!fetching && "Valider"}
        </Button>
      </form>
      {redirectPath && (
        <div>
          <Redirect to={redirectPath} />
        </div>
      )}
      {!location.state && (
        <div>
          <Redirect to="/" />
        </div>
      )}
    </div>
  );
}
