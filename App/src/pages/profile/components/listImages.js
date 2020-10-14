import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import FilterIcon from "@material-ui/icons/Filter";
import { UPLOAD_IMAGE_ROUTE, GET_IMAGES } from "../../../api/routes.js";
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
    img: "http://localhost/api/images/placeholder.png",
    id: 1,
    placeholder: true,
  },
  {
    img: "http://localhost/api/images/placeholder.png",
    id: 2,
    placeholder: true,
  },
  {
    img: "http://localhost/api/images/placeholder.png",
    id: 3,
    placeholder: true,
  },
  {
    img: "http://localhost/api/images/placeholder.png",
    id: 4,
    placeholder: true,
  },
  {
    img: "http://localhost/api/images/placeholder.png",
    id: 5,
    placeholder: true,
  },
];

/*
 ********************** Component *****************************
 */

const formattingResponseImage = (image) => {
  return "http://localhost/api".concat(image.slice(7));
};

export default function ListImages({ handleClickAvatar }) {
  const classes = useStyles();
  const [images, setImages] = React.useState(initialState);

  useEffect(() => {
    apiCall(GET_IMAGES, null, sucessCallGetImages, null, null, "GET", true);
  }, []);

  const sucessCallGetImages = (response) => {
    const arr = response.data.infos;
    const len = arr.length;
    const newState = [...initialState];
    for (let i = 0; i < len; i++) {
      let newIm = formattingResponseImage(response.data.infos[i].image);
      newState[response.data.infos[i].id - 1].img = newIm;
    }
    setImages(newState);
  };
  // define an Array of size
  const arrEmptyImage = Array.apply(null, Array(5 - images.length)).map(
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
    const image = response.data.image;
    console.log(image);
  };

  /********         START OF RENDERING            ********/
  const renderTile = (tile) => {
    console.log(images.length);
    for (let i = 0; i < images.length; i++) {
      if (images[i].placeholder) {
        console.log("count");
        return renderTileAdd(i);
      }
    }
    return <div></div>;
    // return (
    //   <GridListTile key={tile.id} cols={1}>
    //     <img src={tile.img} alt={tile.img} />
    //     <GridListTileBar
    //       classes={{
    //         root: classes.titleBar,
    //         title: classes.title,
    //       }}
    //       actionIcon={
    //         <div>
    //           <IconButton onClick={handleClickAvatar}>
    //             <GradeRoundedIcon />
    //           </IconButton>
    //           <IconButton onClick={handleClickUpdate}>
    //             <FilterIcon />
    //           </IconButton>
    //           <IconButton onClick={handleClickDelete}>
    //             <DeleteIcon />
    //           </IconButton>
    //         </div>
    //       }
    //     />
    //   </GridListTile>
    // );
  };

  const renderTileAdd = (i) => {
    return (
      <GridListTile key={i} cols={1}>
        <img alt={"img".concat(i)} src={images[i].img} />
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
      <GridList cols={2}>{renderTile()}</GridList>
    </div>
  );
}
