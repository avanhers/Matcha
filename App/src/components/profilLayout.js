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
  grid: {
    width: "100%",
    margin: "0px",
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
      style={{ height: "auto", width: "100%", textAlign: "-webkit-center" }}
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
      {/* Container of the page */}
      <Grid container className={classes.grid} spacing={3}>
        {/* Left Part of the screen (image profile) and change information */}
        <Grid
          item
          container
          direction="column"
          spacing={1}
          xs={12}
          sm={4}
          style={{ height: "95vh" }}
        >
          <Paper style={{ height: "99%" }}>
            {/*  Image profile */}
            <Grid className={classes.image} item>
              {renderProfilPicture(user.image[0])}
            </Grid>
            {/*  TextField modifier */}
            <Grid item>
              <TextFieldModifier fieldName={"Nom"} fieldValue={user.lastName} />
              <TextFieldModifier
                fieldName={"Prenom"}
                fieldValue={user.firstName}
              />
              <TextFieldModifier fieldName={"Email"} fieldValue={user.email} />
              <TextFieldModifier fieldName={"Age"} fieldValue={user.age} />
            </Grid>
          </Paper>
        </Grid>
        {/*  Right Container */}
        <Grid item xs={12} sm={8} container direction="column" spacing={3}>
          <Grid item container spacing={1}>
            <Grid item xs={6}>
              <Paper>Test1</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>Test2</Paper>
            </Grid>
          </Grid>
          <Grid item>
            <Paper>
              <TextFieldModifier
                fieldName={"Description"}
                fieldValue={user.description}
                textArea={true}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <TagFilters tags={user.tags} />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <ProfileImages />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilLayout;
