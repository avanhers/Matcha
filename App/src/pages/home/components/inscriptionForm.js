import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiCall from "../../../api/api_request.js";
import { INSCRIPTION_ROUTE } from "../../../api/routes.js";
import useValidation from "../../../common/validator/validatorHook.js";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
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
    height: 45,
  },
}));
/*
 ******************** Validator configureur ********************
 */

const validatorConfig = {
  fields: {
    name: {
      required: { message: "Ce champs est obligatoire" },
      checkName: { message: "Votre nom doit contenir au moins 3 caractères" },
    },
    firstname: {
      required: { message: "Ce champs est obligatoire" },
      checkName: {
        message: "Votre prénom doit contenir au moins 3 caractères",
      },
    },
    email: {
      required: { message: "Ce champs est obligatoire" },
      checkMail: { message: "Ceci n'est pas une adresse mail valide" },
    },
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

export default function InscriptionForm({
  setSnackBar,
  changeModalTypeOpened,
}) {
  const classes = useStyles();
  const [isfetching, setIsFetching] = React.useState(false);

  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  /*
   ** Back validation of Input
   */
  const handleAPIResponse = (response) => {
    let body = response.data;
    const status = body.status;
    if (status === 201) {
      setSnackBar(
        "Un email vous a été envoyer pour confirmer votre inscription",
        "success"
      );
    } else if (status === 400) {
      setSnackBar("Manque des trucs", "success");
    } else if (status === 401) {
      setSnackBar("Cette adresse email est déjà utilisée", "error");
    } else if (status === 402) {
      setSnackBar("Cet identifiant est déjà utilisé", "error");
    } else if (status === 403) {
      setSnackBar("Cette adresse email semble invalide", "error");
    }
  };

  const onSubmitInscription = (data) => {
    apiCall(INSCRIPTION_ROUTE, data, handleAPIResponse, null, setIsFetching);
  };

  /*
   ****************Renders Method
   */
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

  const handleSignInClick = () => {
    changeModalTypeOpened("connection");
  };

  //body that will be print in render

  return (
    <div className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <PersonAddOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Inscription
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(event) => onSubmitVal(event, onSubmitInscription)}
      >
        {renderTextField("email", "Adresse email", "email")}
        {renderTextField("name", "Nom", "text")}
        {renderTextField("firstname", "Prenom", "text")}
        {renderTextField("password", "Mdp", "password")}
        {renderTextField("confirmPwd", "Confirmer Mdp", "password")}
        {renderTextField("username", "login", "text")}
        <Button
          className={classes.submit}
          variant="contained"
          fullWidth
          color="primary"
          type="submit"
          startIcon={isfetching && <CircularProgress color="inherit" />}
        >
          {!isfetching && "Valider"}
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2" onClick={handleSignInClick}>
              J'ai déjà un compte ! connexion
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
