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
const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function SideBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const listItem = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button key="profil">
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItem>
        <ListItem button key="stats">
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="Statistiques" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="private">
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Infos Personnelles" />
        </ListItem>
      </List>
    </div>
  );

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
          {listItem}
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
          {listItem}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default SideBar;
