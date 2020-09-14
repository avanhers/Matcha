import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import CustomCard from "./card.js";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Window() {
  const [spacing, setSpacing] = React.useState(2);
  const [nbCard, setNbCard] = React.useState(2);
  const classes = useStyles();

  const handleButtonClick = () => {
    setNbCard(nbCard + 1);
    console.log(nbCard, typeof nbCard);
  };

  return (
    <div>
      <ButtonBase onClick={() => handleButtonClick()}>test</ButtonBase>

      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={spacing}>
          {Array(nbCard)
            .fill("1")
            .map((value, index) => (
              <Grid key={index} item>
                <CustomCard />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
