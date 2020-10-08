import React from "react";
import { makeStyles } from "@material-ui/core";
import backgroundImage from "../../../assets/images/home_background.jpeg";
import Button from "@material-ui/core/Button";
import FormModalContainer from "../containers/formModalContainer.js";

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

function Home() {
  const [modalTypeOpened, setModalTtypeOpened] = React.useState("");

  const handleModalClose = () => {
    setModalTtypeOpened("");
  };
  const handleModalOpen = (type) => {
    setModalTtypeOpened(type);
  };

  const classes = useStyle();

  return (
    <div className={classes.home_background}>
      <div className={classes.buttonDiv}>
        <Button
          onClick={() => handleModalOpen("connection")}
          variant="contained"
          color="secondary"
        >
          Connexion
        </Button>

        <Button
          onClick={() => handleModalOpen("inscription")}
          variant="contained"
          color="secondary"
        >
          Inscription
        </Button>

        <FormModalContainer
          open={!!modalTypeOpened}
          type={modalTypeOpened}
          onClose={handleModalClose}
          changeModalTypeOpened={setModalTtypeOpened}
        />
      </div>
    </div>
  );
}

export default Home;
