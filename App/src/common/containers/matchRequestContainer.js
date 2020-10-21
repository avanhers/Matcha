import { connect } from "react-redux";
import {
  matchResponse,
  matchResponseReset,
} from "../../state/profilResult/profilResultAction.js";
import MatchRequest from "../components/matchRequest.js";
import { toggleGlobalLoader } from "../../state/globalLoader/globalLoaderAction.js";
import { setRedirectPath } from "../../state/redirectPath/redirectPathAction.js";
const mapStateToProps = (state, ownProps) => {
  const { history } = ownProps;
  return {
    filter: state.filter,
    user: state.user.user,
    history,
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
    setRedirectPath: (path) => {
      dispatch(setRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchRequest);
