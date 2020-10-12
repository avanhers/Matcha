import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import apiCall from "../../../api/api_request";
import { CONNEXION_ROUTE } from "../../../api/routes.js";
import useValidation from "../../../common/validator/validatorHook.js";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
/*
 ******************** CSS STYLE ********************
 */

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  passwordReset: {
    color: "blue",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
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
  getUser,
  setSnackBar,
  changeModalTypeOpened,
}) {
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

  const handlePasswordResetClick = () => {
    changeModalTypeOpened("resetPassword");
  };

  const handleSignUpClick = () => {
    changeModalTypeOpened("inscription");
  };

  return (
    <div className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <BathtubOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Connexion
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        {renderTextField("username", "Login", "text")}
        {renderTextField("password", "Mdp", "password")}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {fetching ? (
          <CircularProgress />
        ) : (
          <Button
            className={classes.submit}
            variant="outlined"
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => onSubmitVal(onSubmit)}
          >
            Valider
          </Button>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" onClick={handlePasswordResetClick}>
              J'ai oublié mon mot de passe
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={handleSignUpClick}>
              Pas de compte ? Je m'inscris
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
