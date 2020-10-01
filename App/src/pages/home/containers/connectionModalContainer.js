import { connect } from "react-redux";
import {
  setUser,
  authRequest,
  authResponse,
} from "../../../state/user/userAction.js";
import ConnectionModal from "../components/connectionModal.js";

const mapStateToProps = (state, ownProps) => {
  const { open, handleClose } = ownProps;
  return {
    open,
    handleClose,
    userRequest: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: (user) => {
      dispatch(authRequest(user));
    },
    getUser: (user) => {
      dispatch(authResponse(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionModal);
