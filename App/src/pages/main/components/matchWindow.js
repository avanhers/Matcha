import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomCard from "./userCard.js";
import clsx from "clsx";
import { drawerWidth } from "./filterDrawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

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
  setPage,
  socket,
}) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const ref = React.useRef(null);
  const listMatches = React.useRef(null);

  const handleNextPageLoad = () => {
    setPage();
  };

  // ScrollToRef est utilisé quand on regénère une seul page de match pour remettre la barre de scroll en haut. Sinon la barre reste en bas et le
  // component infiniteScroll rappel des pages supplémentaire jusqua arrivé au meme nombre de page qu'avant
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  React.useEffect(() => {
    if (matches.pageNb === 1) {
      scrollToRef(ref);
    }
    // on génère le rendu de la liste des matches uniquement quand matches change pour éviter de tout recalculer à chaque fois que le component rerender
    // Améliore la rapidité de l'ouverture du drawer
    listMatches.current = matches.matches.map((match, index) => (
      <Grid key={index} item>
        <CustomCard user={match} socket={socket} />
      </Grid>
    ));
  }, [matches]);

  const renderMatches = () => {
    return (
      <Grid item xs={12} id="scrollableDiv">
        <InfiniteScroll
          style={{ overflow: "hidden" }} //Pour cacher une 2eme barre de scroll qui apparait sur le coté. Semble être lié au backdropLoader
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
            {listMatches.current}
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
      ref={ref}
    >
      <div className={classes.drawerHeader} />
      <div>{matches.isFetching ? <CircularProgress /> : renderMatches()}</div>
    </main>
  );
}
