import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import profilPlaceholder from "../assets/images/potatoPlaceholder.jpeg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 1000,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    width: "50px",
    height: "auto",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

function ProfileImages({ listImages }) {
  const classes = useStyles();
  const limage = [
    "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg",
    "https://tipatate.bzh/wp-content/uploads/2015/06/insigne_ti_patate_fond_noir.png",
    "https://www.lerugbynistere.fr/photos/620_px/patate.jpg",
    "https://e-cours-arts-plastiques.com/wp-content/uploads/2012/12/P1040970.jpg",
  ];
  listImages = limage;
  return (
    <div className={classes.root}>
      <GridList cellHeight={250} cols={5}>
        {listImages.map((image, index) => (
          <GridListTile key={index}>
            <img src={image} alt={"profileImage"} />
            <GridListTileBar
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        {listImages.length < 5
          ? Array(5 - listImages.length)
              .fill("")
              .map((elem, index) => (
                <GridListTile key={index}>
                  <img src={profilPlaceholder} alt={"profileImage"} />
                  <GridListTileBar
                    actionIcon={
                      <div>
                        <input
                          accept="image/*"
                          id="icon-button-photo"
                          type="file"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="icon-button-photo">
                          <IconButton color="primary" component="span">
                            <AddCircleIcon />
                          </IconButton>
                        </label>
                      </div>
                    }
                  />
                </GridListTile>
              ))
          : ""}
      </GridList>
    </div>
  );
}
export default ProfileImages;
