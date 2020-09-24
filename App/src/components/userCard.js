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
import PopularityScore from "./popularityScore.js";
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

export default function CustomCard({ user }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image="https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/patate-douche_338642402.png"
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          See profile
        </Button>
        <PopularityScore score={60} />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
            />
          }
          label="Like"
        />
      </CardActions>
    </Card>
  );
}
