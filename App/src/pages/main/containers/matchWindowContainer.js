import { connect } from "react-redux";
import { setPageNb } from "../../../state/profilResult/profilResultAction.js";
import MatchWindow from "../components/matchWindow.js";

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    drawerStatus: state.drawerStatus,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: () => {
      dispatch(setPageNb());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchWindow);
