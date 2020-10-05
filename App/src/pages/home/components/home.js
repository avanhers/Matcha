import React from "react";
import { makeStyles } from "@material-ui/core";
import backgroundImage from "../../../assets/images/home_background.jpeg";
import Button from "@material-ui/core/Button";
import ConnectionModal from "./connectionModal.js";
import ConnectionModalContainer from "../containers/connectionModalContainer.js";
import InscriptionModal from "./inscriptionModal.js";
import {
  SNACK_BAR_SUCCESS,
  SNACK_BAR_FAILURE,
  NO_SNACK_BAR,
} from "../../../state/actionConst";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyle = makeStyles((theme) => ({
  home_background: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  },
  buttonDiv: {
    textcolor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Home({ snackBarStatus, hideSnackBar }) {
  const [modalConnectionOpen, setModalConnectionOpen] = React.useState(false);
  const [modalInscriptionOpen, setModalInscriptionOpen] = React.useState(false);

  const handleConnectionOpen = () => {
    setModalConnectionOpen(true);
  };
  const handleInscriptionOpen = () => {
    setModalInscriptionOpen(true);
  };
  const handleConnectionClose = () => {
    setModalConnectionOpen(false);
  };
  const handleInscriptionClose = () => {
    setModalInscriptionOpen(false);
  };

  const classes = useStyle();
  const handleCloseSnackBar = () => {
    hideSnackBar();
  };
  const renderSnackBar = () => {
    if (snackBarStatus === SNACK_BAR_SUCCESS) {
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
          <Alert onClose={handleCloseSnackBar} severity="success">
            Votre compte est desormais actif, connectes toi sale con !
          </Alert>
        </Snackbar>
      );
    } else if (snackBarStatus === SNACK_BAR_FAILURE)
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
          <Alert onClose={handleCloseSnackBar} severity="error">
            WTF!!!! TON HASH EST PAS VALIDE
          </Alert>
        </Snackbar>
      );
    else return null;
  };

  return (
    <div className={classes.home_background}>
      <div className={classes.buttonDiv}>
        {renderSnackBar()}
        <Button
          onClick={handleConnectionOpen}
          variant="contained"
          color="secondary"
        >
          Connexion
        </Button>
        <ConnectionModalContainer
          open={modalConnectionOpen}
          handleClose={handleConnectionClose}
        />
        <Button
          onClick={handleInscriptionOpen}
          variant="contained"
          color="secondary"
        >
          Inscription
        </Button>
        <InscriptionModal
          open={modalInscriptionOpen}
          handleClose={handleInscriptionClose}
        />
      </div>
    </div>
  );
}

export default Home;
