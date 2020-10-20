import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import PopularityScore from "../../../common/components/popularityScore.js";
import { CSSTransition } from "react-transition-group";
import { useApiCall } from "../../../api/api_request.js";
import { LIKE_USER, UNLIKE_USER } from "../../../api/routes.js";
import ProfilModal from "./profilModal.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

const user = {
  lastName: "Avangers",
  firstName: "Jean Michel",
  email: "sasuke99@gmail.com",
  age: 45,
  tags: [
    {
      name: "sex",
      enabled: true,
    },
    {
      name: "rock",
      enabled: true,
    },
    {
      name: "sleep",
      enabled: true,
    },
    {
      name: "eat",
      enabled: true,
    },
    {
      name: "dance",
      enabled: true,
    },
  ],
  image: [
    "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg",
  ],
  description: "J'aime les saucisses.",
  password: "pasteque",
};

const apiLikeUserConfig = {
  route: LIKE_USER,
  method: "POST",
};

const apiUnlikeUserConfig = {
  route: UNLIKE_USER,
  method: "POST",
};

export default function CustomCard({ user }) {
  const classes = useStyles();
  const [profilModalOpened, setProfilModalOpened] = React.useState(false);
  const [likeDisabledLoader, setLikeDisabledLoader] = React.useState(false);
  const likeUser = useApiCall(apiLikeUserConfig);
  const unlikeUser = useApiCall(apiUnlikeUserConfig);
  const handleProfilClick = () => {
    setProfilModalOpened(true);
  };

  const handleProfilModalClose = () => {
    setProfilModalOpened(false);
  };

  const successLike = (response) => {
    console.log("like success");
  };

  const successUnlike = (response) => {
    console.log("unlike success");
  };

  const handleLikeClick = (event) => {
    if (event.target.checked) {
      likeUser(
        { urlParams: user.username },
        successLike,
        null,
        setLikeDisabledLoader
      );
    } else {
      unlikeUser(
        { urlParams: user.username },
        successUnlike,
        null,
        setLikeDisabledLoader
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleProfilClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={user.avatar}
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.age} ans
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          See profile
        </Button>
        <PopularityScore score={user.popularityScore} />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              onClick={handleLikeClick}
              disabled={likeDisabledLoader}
            />
          }
          label="Like"
        />
      </CardActions>
      <ProfilModal
        open={profilModalOpened}
        handleClose={handleProfilModalClose}
        user={user}
      />
    </Card>
  );
}
