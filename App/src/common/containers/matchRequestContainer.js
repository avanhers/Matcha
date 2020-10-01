import { connect } from "react-redux";
import {
  matchResponse,
  matchResponseReset,
} from "../../state/profilResult/profilResultAction.js";
import MatchRequest from "../components/matchRequest.js";
import { toggleGlobalLoader } from "../../state/globalLoader/globalLoaderAction.js";
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
