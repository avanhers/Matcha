import { connect } from "react-redux";
import { setRedirectPath } from "../../../state/redirectPath/redirectPathAction.js";
import { hideSnackBar } from "../../../state/snackBar/snackBarAction.js";
import Home from "../components/home.js";

const mapStateToProps = (state) => {
  return {
    snackBarStatus: state.snackBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSnackBar: () => {
      dispatch(hideSnackBar());
    },
    setRedirectPath: (path) => {
      dispatch(setRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
