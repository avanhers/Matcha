import { connect } from "react-redux";
import { toggleDrawer, toggleUseFilter } from "../actions";
import FilterDrawer from "../components/filterDrawer.js";

const mapStateToProps = (state) => {
  return {
    status: state.drawerStatus,
    filterStatus: state.filterStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => {
      dispatch(toggleDrawer(false));
    },
    toggleFilter: () => {
      dispatch(toggleUseFilter());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);
