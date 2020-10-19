import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AgeFilterContainer from "../containers/ageFilterContainer.js";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import PersonnalFilter from "./personnalFilter.js";
import CheckBoxFilter from "./checkBoxFilter.js";
import PopularityFilterContainer from "../containers/popularityFilterContainer.js";
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function FilterDrawer({ status, closeDrawer, filterStatus, toggleFilter }) {
  const classes = useStyles();
  const theme = useTheme();

  console.log(status);

  const renderFilter = (ownFilter) => {
    if (ownFilter) {
      return (
        <div>
          <PersonnalFilter />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={status}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <AgeFilterContainer />
        <PopularityFilterContainer />
        <CheckBoxFilter
          filterStatus={filterStatus}
          toggleFilter={toggleFilter}
        />
        {renderFilter(filterStatus)}
        <Divider />
      </Drawer>
    </div>
  );
}

export default FilterDrawer;