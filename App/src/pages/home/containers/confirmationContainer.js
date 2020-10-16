import { connect } from "react-redux";

import { toggleGlobalLoader } from "../../../state/globalLoader/globalLoaderAction.js";
import Confirmation from "../components/confirmation.js";
import { showSnackBar } from "../../../state/snackBar/snackBarAction.js";

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBackdropLoader: (state) => {
      dispatch(toggleGlobalLoader(state));
    },
    showSnackBar: (message, severity) => {
      dispatch(showSnackBar(message, severity));
    },
  };
};

export default connect(null, mapDispatchToProps)(Confirmation);
