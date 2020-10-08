import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiCall from "../../../api/api_request.js";
import ButtonLoader from "../../../common/components/buttonLoader.js";
import { INSCRIPTION_ROUTE } from "../../../api/routes.js";
import useValidation from "../../../common/validator/validatorHook.js";

/*
 ******************** CSS STYLE ********************
 */

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    height: 540,
    justifyContent: "space-around",
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    // },
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
          "Le mot de passe doit contenir au mois 8 charactere avec au minimum: une minuscule,  une majuscule, un chiffre, 1 charactere speciale",
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

export default function InscriptionForm({}) {
  const classes = useStyles();
  const [err, setErr] = React.useState(null);
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

    if (status === 400) {
      setErr({ code: status, message: "value missing" });
    } else if (status === 401) {
      setErr({ code: status, message: "Cette email est déjà utilisé" });
    } else if (status === 402) {
      setErr({ code: status, message: "Ce login est déjà utilisé" });
    } else if (status === 403) {
      setErr({ code: status, message: "erreur mail non joignable" });
    } else {
      setErr(null);
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

  const renderError = () => {
    if (err) return <p>{err.message}</p>;
  };

  //body that will be print in render
  return (
    <div>
      <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
        Inscription
      </h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formContainer}>
          {renderTextField("email", "Adresse email", "email")}
          {renderTextField("name", "Nom", "text")}
          {renderTextField("firstname", "Prenom", "text")}
          {renderTextField("password", "Mdp", "password")}
          {renderTextField("confirmPwd", "Confirmer Mdp", "password")}
          {renderTextField("username", "login", "text")}
          <ButtonLoader
            fetching={isfetching}
            handleClick={() => onSubmitVal(onSubmitInscription)}
            buttonText="valider"
          />
        </div>

        {renderError()}
      </form>
    </div>
  );
}
