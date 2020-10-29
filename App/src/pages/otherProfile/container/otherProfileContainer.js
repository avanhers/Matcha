import { connect } from "react-redux";
import OtherProfile from "../components/otherProfile.js";

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
  };
};

export default connect(mapStateToProps)(OtherProfile);
