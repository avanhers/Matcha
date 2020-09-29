import { connect } from "react-redux";
import {
  matchResponse,
  matchResponseReset,
  toggleGlobalLoader,
} from "../actions";
import MatchRequest from "../components/matchRequest.js";

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMatches: (matches, page) => {
      dispatch(matchResponse(matches, page));
    },
    setMatchesReset: (matches) => {
      dispatch(matchResponseReset(matches));
    },
    toggleBackdropLoader: (state) => {
      dispatch(toggleGlobalLoader(state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchRequest);
