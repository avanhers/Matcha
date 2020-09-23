import { connect } from "react-redux";
import { matchRequest, matchResponse, toggleTag } from "../actions";
import MainLayout from "../components/mainLayout.js";

const mapDispatchToProps = (dispatch) => {
  return {
    requestMatch: () => {
      dispatch(matchRequest());
    },
    setMatches: (matches, page) => {
      dispatch(matchResponse(matches, page));
    },
  };
};

export default connect(null, mapDispatchToProps)(MainLayout);
