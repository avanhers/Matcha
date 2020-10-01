import { connect } from "react-redux";
import App from "./App.js";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    checkBox: state.useFilter,
  };
};

export default connect(mapStateToProps)(App);
