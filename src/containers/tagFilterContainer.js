import { connect } from "react-redux";
import { toggleTag } from "../actions";
import TagFilters from "../components/tagFilters.js";

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTagClick: (name) => {
      dispatch(toggleTag(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagFilters);
