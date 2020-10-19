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
  passwordReset: {
    color: "blue",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

/*
 ******************** Component ********************
 */
export default function ConnectionModal({
  open,
  handleClose,
  userRequest,
  getUser,
  requestUser,
  setSnackBar,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [passwordReset, setPasswordReset] = React.useState(false);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const [fetching, setFetching] = React.useState(false);

  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const onSuccessApi = (response) => {
    console.log(response);
    if (response.data.status === 200) getUser(!response.data.complete);
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

  const onSubmit = () => {
    console.log(data);
    requestUser({});
    if (!passwordReset) {
      apiCall(
        CONNEXION_ROUTE,
        { username: data.username, password: data.password },
        onSuccessApi,
        null,
        setFetching,
        "POST",
        false
      );
    } else {
      apiCall(
        PASSWORD_RESET_ROUTE,
        { email: data.email },
        onSuccessAPIpassword,
        null,
        setFetching,
        "POST",
        false
      );
    }
  };

  const renderTextField = (name, label, type) => {
    return (
      <TextField
        required
        id={name}
        label={label}
        value={data[name]}
        variant="outlined"
        name={name}
        //error={data.showError[name]}
        //helperText={data.error[name]}
        onChange={onInputChange}
        //onBlur={handleBlur}
        type={type}
        // onFocus={handleFocus}
      />
    );
  };

  const handlePasswordResetClick = () => {
    setPasswordReset(!passwordReset);
  };

  const renderMdpOublie = () => {
    return (
      <div>
        {/* <Link component={RouterLink} variant="body2" to="/profil">
          {"mot de passe oublié"}
        </Link> */}
        {!passwordReset && (
          <p
            className={classes.passwordReset}
            variant="body2"
            component={RouterLink}
            onClick={handlePasswordResetClick}
          >
            Mot de passe oublié
          </p>
        )}
        {passwordReset && (
          <IconButton
            onClick={handlePasswordResetClick}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
      </div>
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        {!passwordReset ? "Connexion" : "Reinitialiser mom mot de passe"}
      </h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.formContainer}>
          {!passwordReset && renderTextField("username", "Login", "text")}
          {!passwordReset && renderTextField("password", "Mdp", "password")}
          {passwordReset && renderTextField("email", "Email", "email")}
          {renderMdpOublie()}
        </div>
        {fetching ? (
          <CircularProgress />
        ) : (
          <Button variant="outlined" onClick={onSubmit}>
            Valider
          </Button>
        )}
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
