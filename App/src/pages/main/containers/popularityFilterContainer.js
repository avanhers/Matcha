import { connect } from "react-redux";
import { changePopularity } from "../../../state/filter/filterAction.js";
import PopularityFilter from "../components/popularityFilter.js";

const mapDispatchToProps = (dispatch) => {
  return {
    onPopularityChange: (value) => {
      dispatch(changePopularity(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(PopularityFilter);
