import { connect } from "react-redux";
import { setUser } from "../actions";
import ConnectionModal from "../components/connectionModal.js";

const mapStateToProps = (state, ownProps) => {
  const { open, handleClose } = ownProps;
  return {
    open,
    handleClose,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionModal);
