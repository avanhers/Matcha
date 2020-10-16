import { connect } from "react-redux";
import ProfilLayout from "../components/profilLayout.js";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilLayout);
