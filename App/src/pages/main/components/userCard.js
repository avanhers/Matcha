import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import PopularityScore from "../../../common/components/popularityScore.js";
import { useApiCall } from "../../../api/api_request.js";
import { LIKE_USER, UNLIKE_USER } from "../../../api/routes.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

const apiLikeUserConfig = {
  route: LIKE_USER,
  method: "POST",
};

const apiUnlikeUserConfig = {
  route: UNLIKE_USER,
  method: "POST",
};

export default function CustomCard({ user, socket }) {
  const classes = useStyles();
  const [likeDisabledLoader, setLikeDisabledLoader] = React.useState(false);
  const [likeChecked, setLikeChecked] = React.useState(!!user.likedId);
  const likeUser = useApiCall(apiLikeUserConfig);
  const unlikeUser = useApiCall(apiUnlikeUserConfig);
  // const socket = useStore().getState().socket;


  const successLike = (response) => {
    console.log(socket);
    if (response.data.status) {
      const status = response.data.status;
      if (status === 201) {
        if (socket)
          socket.emit("notification", { type: "like", target: user.username });
      } else if (status === 202) {
        if (socket)
          socket.emit("notification", { type: "match", target: user.username });
      }
    }

    console.log("like success");
  };

  const successUnlike = (response) => {
    console.log(response)
    if (response.data.status) {
      const status = response.data.status;
      if (status === 201) {
        if (socket) {
          socket.emit("notification", { type: "unmatch", target: user.username });
          console.log("emit unmatch")
        }
      }
    }
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
    setLikeChecked(!likeChecked);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="200"
        image={user.avatar}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {user.username}
        </Typography>
        <Typography gutterBottom variant="h4" component="h2">
          {user.age} ans
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {Math.floor(user.distance)} Km
        </Typography>
      </CardContent>

      <CardActions>
        <Link to={"/otherProfile/" + user.username}>
          <Button size="small" color="primary">
            Voir profile
          </Button>
        </Link>
        <PopularityScore score={user.popularityScore} />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              checked={likeChecked}
              onClick={handleLikeClick}
              disabled={likeDisabledLoader}
            />
          }
          label="Like"
        />
      </CardActions>

    </Card>
  );
}
