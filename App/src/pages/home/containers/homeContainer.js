import { connect } from "react-redux";
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
