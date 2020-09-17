import { connect } from "react-redux";
import { changeAge } from "../actions";
import MatchWindow from "../components/matchWindow.js";

const mapStateToProps = (state) => {
  return {
    nb: state.age,
  };
};

export default connect(mapStateToProps)(MatchWindow);
