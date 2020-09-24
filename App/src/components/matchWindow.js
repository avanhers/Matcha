import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomCard from "./userCard.js";
import clsx from "clsx";
import { drawerWidth } from "./filterDrawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import requestMatchesCall from "../common/requestMatches.js";
import InfiniteScroll from "react-infinite-scroll-component";
import BackdropLoaderContainer from "../containers/backdropLoaderContainer.js";

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

export default function MatchWindow({
  drawerStatus,
  matches,
  requestMatch,
  setMatches,
  toggleBackdropLoader,
}) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleNextPageLoad = () => {
    toggleBackdropLoader(true);
    const timer = setTimeout(() => {
      requestMatchesCall(
        matches.pageNb + 1,
        10,
        setMatches,
        null,
        toggleBackdropLoader
      );
    }, 1000);
  };

  const renderMatches = () => {
    return (
      <Grid item xs={12} id="scrollableDiv">
        <InfiniteScroll
          dataLength={matches.matches.length} //This is important field to render the next data
          next={handleNextPageLoad}
          hasMore={true}
          scrollThreshold="100px"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Il n'y a plus de profils correspondant à votre recherche</b>
            </p>
          }
        >
          <Grid container justify="flex-start" spacing={spacing}>
            {matches.matches.map((match, index) => (
              <Grid key={index} item>
                <CustomCard user={match} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Grid>
    );
  };

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: drawerStatus,
      })}
    >
      <div className={classes.drawerHeader} />
      <div>{matches.isFetching ? <CircularProgress /> : renderMatches()}</div>
    </main>
  );
}
