import React from "react";
import { makeStyles } from "@material-ui/core";
import backgroundImage from "../assets/images/home_background.jpeg";
import Button from "@material-ui/core/Button";
import ConnectionModal from "./connectionModal.js";
import InscriptionModal from "./inscriptionModal.js";

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
    height: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

function Home() {
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
  return (
    <div className={classes.home_background}>
      <div className={classes.buttonDiv}>
        <Button
          onClick={handleConnectionOpen}
          variant="contained"
          color="secondary"
        >
          Connexion
        </Button>
        <ConnectionModal
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
