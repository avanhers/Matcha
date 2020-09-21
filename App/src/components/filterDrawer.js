import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AgeFilterContainer from "../containers/ageFilterContainer.js";
import TagFilterContainer from "../containers/tagFilterContainer.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

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

function FilterDrawer({ status, closeDrawer }) {
  const classes = useStyles();
  const theme = useTheme();
  console.log(status);
  return (
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
      <TagFilterContainer />
      <Divider />
    </Drawer>
  );
}

export default FilterDrawer;
