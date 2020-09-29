import { connect } from "react-redux";
import {
  matchRequest,
  matchResponse,
  toggleGlobalLoader,
  setPageNb,
} from "../actions";
import MatchWindow from "../components/matchWindow.js";

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    drawerStatus: state.drawerStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // requestMatch: () => {
    //   dispatch(matchRequest());
    // },
    // setMatches: (matches, page) => {
    //   dispatch(matchResponse(matches, page));
    // },
    // toggleBackdropLoader: (state) => {
    //   dispatch(toggleGlobalLoader(state));
    // },
    setPage: () => {
      dispatch(setPageNb());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchWindow);
