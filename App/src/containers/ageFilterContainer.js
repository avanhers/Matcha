import { connect } from "react-redux";
import { changeAge } from "../actions";
import AgeFilter from "../components/rangeSlider.js";

const mapStateToProps = (state) => {
  return {
    ageRange: state.age,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAgeChange: (event, value) => {
      dispatch(changeAge(event, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgeFilter);
