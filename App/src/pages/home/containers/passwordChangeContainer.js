import { connect } from "react-redux";

import PasswordChangeForm from "../components/passwordChange.js";
import { showSnackBar } from "../../../state/snackBar/snackBarAction.js";

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackBar: (message, severity) => {
      dispatch(showSnackBar(message, severity));
    },
  };
};

export default connect(null, mapDispatchToProps)(PasswordChangeForm);
