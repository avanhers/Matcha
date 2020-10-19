import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";

//   {
//     vertical: "top",
//     horizontal: "center",
//   }

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar({ anchor, open, severity, message, closeSnackBar }) {
  return (
    <Snackbar
      anchorOrigin={anchor}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackBar}
    >
      <Alert onClose={closeSnackBar} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
