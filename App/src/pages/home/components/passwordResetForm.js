import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import apiCall from "../../../api/api_request";
import { PASSWORD_RESET_ROUTE } from "../../../api/routes.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useValidation from "../../../common/validator/validatorHook.js";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SportsKabaddiOutlinedIcon from "@material-ui/icons/SportsKabaddiOutlined";
/*
 ******************** CSS STYLE ********************
 */

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  setSnackBar,
  changeModalTypeOpened,
}) {
  const classes = useStyles();
  const [fetching, setFetching] = React.useState(false);

  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  const onSuccessAPIpassword = (response) => {
    if (response.data.status === 201) {
      setSnackBar(
        "Un email vous a été envoyer check tes mails batard !",
        "success"
      );
      changeModalTypeOpened("");
    } else if (response.data.status === 402)
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
    <div className={classes.formContainer}>
      <Avatar className={classes.avatar}>
        <SportsKabaddiOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Mot de passe oublié
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(event) => onSubmitVal(event, onSubmit)}
      >
        {renderTextField("email", "Email", "email")}
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
        <Grid container>
          <Grid item>{renderMdpOublie()}</Grid>
        </Grid>
      </form>
    </div>
  );
}
