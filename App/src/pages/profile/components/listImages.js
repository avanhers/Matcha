import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import FilterIcon from "@material-ui/icons/Filter";
import {
  UPLOAD_IMAGE_ROUTE,
  GET_IMAGES,
  DELETE_IMAGE_ROUTE,
} from "../../../api/routes.js";
import { apiCall, apiCallPost } from "../../../api/api_request.js";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
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
    img: profilPlaceholder,
    id: 1,
    bddId: -1,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 2,
    bddId: -2,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 3,
    bddId: -3,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 4,
    bddId: -4,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 5,
    bddId: -5,
    placeholder: true,
  },
];

const formattingResponseImage = (image) => {
  if (image.substr(0, 5) !== "https") {
    return "http://localhost/api".concat(image.slice(7));
  } else return image;
};
const imageExist = (images, bddId) => {
  return images.find((image) => image.bddId === bddId);
};
const isAvatar = (avatarId, bddId) => {
  return avatarId === bddId;
};
const findIndexNewImage = (images) => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].bddId < 0) return i;
  }
  return 0;
};

/*
 ********************** Component *****************************
 */

export default function ListImages({ changeAvatar, avatar }) {
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
      let bddId = response.data.infos[i].id;
      let newIm = formattingResponseImage(response.data.infos[i].image);
      newState[i].img = newIm;
      newState[i].bddId = bddId;

      newState[i].placeholder = false;
    }
    setImages(newState);
  };

  const deleteImage = (image) => {
    apiCallPost(
      DELETE_IMAGE_ROUTE.concat("/").concat(image.bddId).concat("/delete"),
      null,
      successDelete,
      image,
      null,
      null
    );
  };
  const successDelete = (response, image) => {
    const newState = [...images];
    console.log("in delete", response);
    if (response.data.status !== 400) {
      newState[image.id - 1] = {
        img: profilPlaceholder,
        id: image.id,
        bddId: -2,
        placeholder: true,
      };
      setImages(newState);
    }
  };

  /*Function call when uploading a new photo: happen */
  const handleUpload = (event, image = 0) => {
    let file = event.target.files[0];
    console.log(image.bddId);
    let reader = new FileReader();

    /*function call when load succes*/
    reader.onload = function (event) {
      const formData = new FormData();
      formData.append("image", file);
      //formData.append("isProfile", "");
      formData.append("imageId", image.bddId);
      apiCallPost(UPLOAD_IMAGE_ROUTE, formData, succesCall, image, null, null);
    };

    reader.readAsText(file);
  };

  const succesCall = (response, image) => {
    console.log(response);
    const bddId = response.data.image.id;
    const newPath = formattingResponseImage(response.data.image.path);
    const newState = [...images];
    // setAvatar

    if (imageExist(images, bddId)) {
      if (isAvatar(avatar.id, bddId)) changeAvatar({ ...image, img: newPath });
      images.forEach((image, index) => {
        if (image.bddId === bddId)
          newState[index] = { ...image, img: newPath, placeholder: false };
      });
    } else {
      let index = findIndexNewImage(images);
      //update
      newState[index] = {
        ...images[index],
        img: newPath,
        bddId: bddId,
        placeholder: false,
      };
    }

    setImages(newState);
  };

  /********         START OF RENDERING            ********/
  const renderImage = (image) => {
    if (image.placeholder) return renderPlaceholderImage(image);
    else return renderUserImage(image);
  };

  //render image from User
  const renderUserImage = (image) => {
    return (
      <GridListTile key={image.id} cols={1}>
        <img src={image.img} alt={"img".concat(image.id)} />

        <GridListTileBar
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          actionIcon={
            <div>
              <GradeRoundedIcon
                color={image.bddId === avatar.id ? "primary" : "disabled"}
                onClick={(i) => changeAvatar(image)}
              />

              <input
                accept="image/*"
                id={image.id}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleUpload(e, image)}
              />
              <label htmlFor={image.id}>
                <FilterIcon />
              </label>

              <DeleteIcon onClick={() => deleteImage(image)} />
            </div>
          }
        />
      </GridListTile>
    );
  };
  const renderPlaceholderImage = (image) => {
    return (
      <GridListTile key={image.id} cols={1}>
        <img alt={"img".concat(image.id)} src={image.img} />
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
                onChange={(e) => handleUpload(e)}
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
      <GridList cols={2}>{images.map((image) => renderImage(image))}</GridList>
    </div>
  );
}
