import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextFieldModifier from "./textFieldModifier";
import TagFilters from "./tagFilters.js";
import ProfileImages from "./profileImages.js";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textFieldModifier: {
    textAlign: "left",
  },
  image: {
    textAlign: "-webkit-center",
  },
}));
function renderProfilPicture(url) {
  return (
    <Avatar
      alt="Remy Sharp"
      src={url}
      sizes="large"
      style={{ height: "20vh", width: "20vh" }}
    />
  );
}

function renderInfo() {}

function ProfilLayout() {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid className={classes.image} item xs={4}>
          {renderProfilPicture(user.image[0])}
        </Grid>
        <Grid className={classes.textFieldModifier} item xs={4}>
          <TextFieldModifier fieldName={"Nom"} fieldValue={user.lastName} />
          <TextFieldModifier fieldName={"Prenom"} fieldValue={user.firstName} />
          <TextFieldModifier fieldName={"Email"} fieldValue={user.email} />
          <TextFieldModifier fieldName={"Age"} fieldValue={user.age} />
        </Grid>
        <Grid item xs={4}>
          <TagFilters tags={user.tags} />
        </Grid>

        <Grid item xs={12}>
          <TextFieldModifier
            fieldName={"Description"}
            fieldValue={user.description}
            textArea={true}
          />
        </Grid>
      </Grid>
      <ProfileImages />
    </div>
  );
}

export default ProfilLayout;
