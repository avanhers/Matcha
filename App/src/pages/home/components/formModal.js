import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import InscriptionForm from "./inscriptionForm.js";
import ConnectionForm from "./connectionForm.js";
import PasswordResetForm from "./passwordResetForm.js";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "100%",
  },
}));

/*
 ******************** Component ********************
 */
export default function FormModal({
  open,
  onClose,
  type,
  setSnackBar,
  getUser,
  changeModalTypeOpened,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const typeModalMap = {
    connection: (
      <ConnectionForm
        setSnackBar={setSnackBar}
        getUser={getUser}
        changeModalTypeOpened={changeModalTypeOpened}
      />
    ),
    inscription: (
      <InscriptionForm
        setSnackBar={setSnackBar}
        changeModalTypeOpened={changeModalTypeOpened}
      />
    ),
    resetPassword: (
      <PasswordResetForm
        setSnackBar={setSnackBar}
        changeModalTypeOpened={changeModalTypeOpened}
      />
    ),
  };
  return (
    <div>
      <Modal
        open={open}
        onBackdropClick={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container maxWidth="xs">
          <CssBaseline />
          <div style={modalStyle} className={classes.paper}>
            {typeModalMap[type]}
          </div>
        </Container>
      </Modal>
    </div>
  );
}
