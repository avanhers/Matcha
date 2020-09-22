import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import CustomCard from "./userCard.js";
import clsx from "clsx";
import { drawerWidth } from "./filterDrawer";
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

export default function MatchWindow({ drawerOpen }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}
    >
      <div className={classes.drawerHeader} />
      <div>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={spacing}>
            {Array(6)
              .fill("1")
              .map((value, index) => (
                <Grid key={index} item>
                  <CustomCard />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </div>
    </main>
  );
}
