import { connect } from "react-redux";
import { changeAge } from "../actions";
import AgeFilter from "../components/ageFilter.js";

const mapStateToProps = (state) => {
  return {
    ageRange: state.filter.age,
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
