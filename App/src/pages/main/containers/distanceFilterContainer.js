import { connect } from "react-redux";
import { changeDistance } from "../../../state/filter/filterAction.js";
import DistanceFilter from "../components/distanceFilter.js";

const mapDispatchToProps = (dispatch) => {
  return {
    onDistanceChange: (value) => {
      dispatch(changeDistance(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(DistanceFilter);
