import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import FilterIcon from "@material-ui/icons/Filter";
import { UPLOAD_IMAGE_ROUTE } from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";
/*
 ********************** CSS STYLE *****************************
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },

  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
  },
}));

/*
 ********************** InitialState *****************************
 */

const initialState = [
  {
    img:
      "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg",
  },
  {
    img:
      "https://tipatate.bzh/wp-content/uploads/2015/06/insigne_ti_patate_fond_noir.png",
  },
];

/*
 ********************** Component *****************************
 */

export default function ListImages({ handleClickAvatar }) {
  const classes = useStyles();
  const [tileData] = React.useState(initialState);
  // define an Array of size
  const arrEmptyImage = Array.apply(null, Array(5 - tileData.length)).map(
    function (x, i) {
      return i;
    }
  );

  const handleClickUpdate = () => {};
  const handleClickDelete = () => {};
  const handleCapture = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    /*function call when load succes*/
    reader.onload = function (event) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("isProfile", "");

      apiCall(
        UPLOAD_IMAGE_ROUTE,
        formData,
        succesCall,
        null,
        null,
        "POST",
        true
      );
    };

    reader.readAsText(file);
  };
  const succesCall = (response) => {
    console.log(response);
  };
  /********         START OF RENDERING            ********/
  const renderTile = (tile) => {
    return (
      <GridListTile key={tile.img} cols={1}>
        <img src={tile.img} alt={tile.title} />
        <GridListTileBar
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          actionIcon={
            <div>
              <IconButton onClick={handleClickAvatar}>
                <GradeRoundedIcon />
              </IconButton>
              <IconButton onClick={handleClickUpdate}>
                <FilterIcon />
              </IconButton>
              <IconButton onClick={handleClickDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          }
        />
      </GridListTile>
    );
  };

  const renderTileAdd = (i) => {
    return (
      <GridListTile key={i} cols={1}>
        <img
          alt={"img".concat(i)}
          src="https://www.blog-nouvelles-technologies.fr/wp-content/uploads/2017/12/detective-avatar-icon-01--840x500.jpg"
        />
        <GridListTileBar
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          actionIcon={
            <div>
              <input
                accept="image/*"
                id="icon-button-photo"
                type="file"
                style={{ display: "none" }}
                onChange={handleCapture}
              />
              <label htmlFor="icon-button-photo">
                <AddCircleRoundedIcon />
              </label>
            </div>
          }
        />
      </GridListTile>
    );
  };
  return (
    <div className={classes.root}>
      <GridList cols={2}>
        {tileData.map((tile) => renderTile(tile))}
        {arrEmptyImage.map((tile) => renderTileAdd(tile))}
      </GridList>
    </div>
  );
}
