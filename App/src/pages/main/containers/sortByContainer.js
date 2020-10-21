import { connect } from "react-redux";
import { setSortBy } from "../../../state/filter/filterAction.js";
import SortBy from "../components/sortBy.js";

const mapStateToProps = (state) => {
  return {
    sortBy: state.filter.sortBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortBy: (value) => {
      dispatch(setSortBy(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
