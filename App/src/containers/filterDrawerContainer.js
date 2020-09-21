import { connect } from "react-redux";
import { toggleDrawer } from "../actions";
import FilterDrawer from "../components/filterDrawer.js";

const mapStateToProps = (state) => {
  return {
    status: state.drawerStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => {
      dispatch(toggleDrawer(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);
