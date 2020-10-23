import { connect } from "react-redux";
import { setSortBy, setOrderBy } from "../../../state/filter/filterAction.js";
import SortBy from "../components/sortBy.js";

const mapStateToProps = (state) => {
  return {
    sortBy: state.filter.sortBy,
    orderBy: state.filter.orderBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortBy: (value) => {
      dispatch(setSortBy(value));
    },
    setOrderBy: (value) => {
      dispatch(setOrderBy(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
