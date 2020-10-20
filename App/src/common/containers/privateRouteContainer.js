import { connect } from "react-redux";
import PrivateRoute from "../components/privateRoute.js";
import { setRedirectPath } from "../../state/redirectPath/redirectPathAction.js";

const mapStateToProps = (state) => {
  return {
    redirectPath: state.redirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRedirectPath: (path) => {
      dispatch(setRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
