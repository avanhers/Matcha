import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import apiCall from "../../../api/api_request";
import { CONNEXION_ROUTE } from "../../../api/routes.js";
import {
  SNACK_BAR_SUCCESS,
  SNACK_BAR_FAILURE,
  NO_SNACK_BAR,
} from "../../../state/actionConst";
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
import { from } from "../../../../../api/framework/queryCreator";

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
 ******************** Component ********************
 */
export default function ConnectionModal({
  open,
  handleClose,
  userRequest,
  getUser,
  requestUser,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [data, setData] = React.useState({ username: "", password: "" });
  const [fetching, setFetching] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState({
    status: NO_SNACK_BAR,
    message: "",
  });
  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const onSuccessApi = (response) => {
    if (response.data.status === 200) getUser(response.data.user);
    if (response.data.status === 401)
      setSnackBar({
        status: SNACK_BAR_FAILURE,
        message: "valide ton compte connard !",
      });
    if (response.data.status === 402)
      setSnackBar({
        status: SNACK_BAR_FAILURE,
        message:
          "tas demander a changer ton mot de passe et apres tu te repointe ici en croyant aue ca va marcher tu tes cru ou !",
      });
    if (response.data.status === 403)
      setSnackBar({ status: SNACK_BAR_FAILURE, message: "pw de merde!" });
  };
  const onSubmit = () => {
    console.log(data);
    requestUser({});
    apiCall(CONNEXION_ROUTE, data, onSuccessApi, null, setFetching);
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, status: NO_SNACK_BAR });
  };
  /*
   ******************** Render methods ********************
   */
  const renderSnackBar = () => {
    const severity = "";
    if (snackBar.status === SNACK_BAR_SUCCESS) {
      severity = "success";
    } else if (snackBar.status === SNACK_BAR_FAILURE) {
      severity = "failure";
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    );
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

  const renderMdpOublie = () => {
    return (
      <div>
        <Link component={RouterLink} variant="body2" to="/profil">
          {"mot de passe oublié"}
        </Link>
      </div>
    );
  };

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
          {renderTextField("username", "Login", "text")}
          {renderTextField("password", "Mdp", "password")}
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
      {snackbar.status !== NO_SNACK_BAR ? renderSnackBar() : null}
    </div>
  );
}
