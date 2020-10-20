import { connect } from "react-redux";
import App from "./App.js";

const mapStateToProps = (state) => {
  return {
    userCompleted: state.user.completed,
    checkBox: state.useFilter,
    redirectPath: state.redirectPath,
  };
};

export default connect(mapStateToProps)(App);
