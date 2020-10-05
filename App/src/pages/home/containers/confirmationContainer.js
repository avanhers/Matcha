import { connect } from "react-redux";

import { toggleGlobalLoader } from "../../../state/globalLoader/globalLoaderAction.js";
import Confirmation from "../components/confirmation.js";
import { showSnackBar } from "../../../state/hashConfirmationSnackBar/hashConfirmationSnackBarAction.js";
const mapDispatchToProps = (dispatch) => {
  return {
    toggleBackdropLoader: (state) => {
      dispatch(toggleGlobalLoader(state));
    },
    showSnackBar: (response) => {
      dispatch(showSnackBar(response));
    },
  };
};

export default connect(null, mapDispatchToProps)(Confirmation);
