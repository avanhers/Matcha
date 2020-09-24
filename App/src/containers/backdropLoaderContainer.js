import { connect } from "react-redux";
import BackdropLoader from "../components/backdropLoader.js";

const mapStateToProps = (state) => {
  return {
    isLoading: state.globalLoaderState,
  };
};

export default connect(mapStateToProps)(BackdropLoader);
