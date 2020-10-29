import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AgeFilterContainer from "../containers/ageFilterContainer.js";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import PersonnalFilter from "./personnalFilter.js";
import CheckBoxFilter from "./checkBoxFilter.js";
import PopularityFilterContainer from "../containers/popularityFilterContainer.js";
import DistanceFilterContainer from "../containers/distanceFilterContainer.js";
import SortByContainer from "../containers/sortByContainer.js";
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

function FilterDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  const renderDrawerContent = () => {
    return (
      <div>
        <div className={classes.drawerHeader}></div>
        <Divider />
        <AgeFilterContainer />
        <PopularityFilterContainer />
        <DistanceFilterContainer />
        <CheckBoxFilter
          filterStatus={props.filterStatus}
          toggleFilter={props.toggleFilter}
        />
        {renderFilter(props.filterStatus)}
        <Divider />
        <SortByContainer />
      </div>
    );
  };
  return (
    <div>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Hidden>
      {/*  Part show when big size        */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {renderDrawerContent()}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default FilterDrawer;
