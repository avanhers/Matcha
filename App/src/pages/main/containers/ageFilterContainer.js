import { connect } from "react-redux";
import { changeAge } from "../../../state/filter/filterAction.js";
import AgeFilter from "../components/ageFilter.js";

const mapStateToProps = (state) => {
  return {
    ageMin: state.filter.ageMin,
    ageMax: state.filter.ageMax,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAgeChange: (value) => {
      dispatch(changeAge(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgeFilter);
