import { connect } from "react-redux";
import { toggleDrawer } from "../actions";
import HeadBar from "../components/headBar.js";

const mapStateToProps = (state) => {
  return {
    status: state.drawerStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => {
      dispatch(toggleDrawer(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadBar);
