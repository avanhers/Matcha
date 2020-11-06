import { connect } from "react-redux";
import SnackBar from "../components/snackBar.js";
import { hideSnackBar } from "../../state/snackBar/snackBarAction.js";

const mapStateToProps = (state) => {
  const { anchor, open, severity, message } = state.snackBar;
  return {
    anchor,
    open,
    severity,
    message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackBar: () => {
      dispatch(hideSnackBar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
