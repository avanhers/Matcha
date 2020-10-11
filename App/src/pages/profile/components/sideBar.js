import React from "react";

/*list item*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

/*icon*/
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LockIcon from "@material-ui/icons/Lock";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const drawerWidth = 240;

/*
 ********************** CSS STYLE *****************************
 */

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

/*
 ********************** Component *****************************
 */
function SideBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderItem = (key, icon, text) => {
    return (
      <ListItem
        button
        value={key}
        onClick={(k) => props.handleClick(key)}
        key={key}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text}></ListItemText>
      </ListItem>
    );
  };

  const renderListItem = () => {
    return (
      <div>
        <div className={classes.toolbar} />
        <List>
          {renderItem("profil", <PersonOutlineIcon />, "Profil")}
          {renderItem("stats", <EqualizerIcon />, "Statistques")}
        </List>
        <Divider />
        <List>{renderItem("private", <LockIcon />, "Infos Personnelles")}</List>
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
          {renderListItem()}
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
          {renderListItem()}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default SideBar;
