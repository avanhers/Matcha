import { connect } from "react-redux";
import App from "../components/App.js";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    checkBox: state.useFilter,
  };
};

export default connect(mapStateToProps)(App);
