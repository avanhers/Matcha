import { connect } from "react-redux";
import Chat from "../components/chat.js";

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
  };
};

export default connect(mapStateToProps)(Chat);
