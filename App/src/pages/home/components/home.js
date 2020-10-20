import React from "react";
import { makeStyles } from "@material-ui/core";
import backgroundImage from "../../../assets/images/home_background.jpeg";
import Button from "@material-ui/core/Button";
import FormModalContainer from "../containers/formModalContainer.js";
import { useApiCall } from "../../../api/api_request.js";
import { CAN_LOG_ROUTE } from "../../../api/routes.js";

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

const apiCallConfig = {
  route: CAN_LOG_ROUTE,
  method: "GET",
  sendToken: true,
};

function Home({ setRedirectPath }) {
  const [modalTypeOpened, setModalTtypeOpened] = React.useState("");
  const apiCall = useApiCall(apiCallConfig);

  const successCallBack = (response) => {
    const status = response.data.status;
    if (status === 400) {
      setRedirectPath("/");
    }
  };

  React.useEffect(() => {
    apiCall(null, successCallBack, null, null);
  }, []);

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
      </div>
      <FormModalContainer
        open={!!modalTypeOpened}
        type={modalTypeOpened}
        onClose={handleModalClose}
        changeModalTypeOpened={setModalTtypeOpened}
      />
    </div>
  );
}

export default Home;
