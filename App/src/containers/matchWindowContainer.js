import { connect } from "react-redux";
import { changeAge } from "../actions";
import MatchWindow from "../components/matchWindow.js";

const mapStateToProps = (state) => {
  return {
    nb: state.age,
    matches: state.matches,
    drawerStatus: state.drawerStatus,
  };
};

export default connect(mapStateToProps)(MatchWindow);
