import { connect } from "react-redux";
import { toggleTag } from "../../../state/filter/filterAction.js";
import TagFilters from "../components/tagFilters.js";

const mapStateToProps = (state) => {
  return {
    tags: state.filter.tagsObject,
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
