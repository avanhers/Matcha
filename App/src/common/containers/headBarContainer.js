import { connect } from "react-redux";

import { toggleDrawer } from "../../state/drawerStatus/drawerStatusAction.js";
import { setRedirectPath } from "../../state/redirectPath/redirectPathAction.js";
import HeadBar from "../components/headBar.js";

const mapStateToProps = (state) => {
  return {
    status: state.drawerStatus,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => {
      dispatch(toggleDrawer(true));
    },
    setRedirect: (path) => {
      dispatch(setRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadBar);
