import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
import { apiCallGet } from "../../../api/api_request.js"
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    //width: "100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const tileData = [
  {
    avatar: profilPlaceholder,
    username: "personne",
  },
  {
    avatar: profilPlaceholder,
    username: "personne1",
  },
  {
    avatar: profilPlaceholder,
    username: "personne2",
  },
  {
    avatar: profilPlaceholder,
    username: "personne3",
  },
  {
    avatar: profilPlaceholder,
    username: "personne4",
  },
  {
    avatar: profilPlaceholder,
    username: "personne5",
  },
  {
    avatar: profilPlaceholder,
    username: "personne6",
  },
  {
    avatar: profilPlaceholder,
    username: "personne7",
  },
];

function SingleLineGridList({ route }) {
  const classes = useStyles();
  const [result, setResult] = React.useState(tileData);
  useEffect(() => {
    apiCallGet(route, successGet, null, null, "GET", true);
  }, []);

  const successGet = (response, param) => {
    console.log(response.data.data);
    const newData = response.data.data;
    newData.map((item) => {
      if (item.avatar.substr(0, 5) !== "https")
        item.avatar = "http:localhost/api".concat(item.avatar.slice(7));
      return 0
    });
    setResult(newData);
  };

  const renderActionIcon = (tile) => {
    const route = "/otherProfile/" + tile.username;
    return (
      <Link to={route} style={{ color: "#FFF" }}>
        <IconButton aria-label={`star ${tile.username}`}>
          <VisibilityIcon className={classes.title} />
        </IconButton>
      </Link>
    );
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {result.map((tile) => (
          <GridListTile key={tile.username}>
            <img src={tile.avatar} alt={tile.username} />
            <GridListTileBar
              title={tile.username}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={renderActionIcon(tile)}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default SingleLineGridList;
