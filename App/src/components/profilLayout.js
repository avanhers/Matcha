import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextFieldModifier from "./textFieldModifier";
import TagFilters from "./tagFilters.js";
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
function renderProfilPicture() {
  return (
    <Avatar
      alt="Remy Sharp"
      src="https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg"
      sizes="large"
      style={{ height: "20vh", width: "20vh" }}
    />
  );
}

function renderInfo() {}

function ProfilLayout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid className={classes.image} item xs={4}>
          {renderProfilPicture()}
        </Grid>
        <Grid className={classes.textFieldModifier} item xs={4}>
          <TextFieldModifier fieldName={"Nom"} fieldValue={"tata"} />
          <TextFieldModifier fieldName={"Prenom"} fieldValue={""} />
          <TextFieldModifier fieldName={"Email"} fieldValue={""} />
          <TextFieldModifier fieldName={"Age"} fieldValue={""} />
        </Grid>
        <Grid item xs={4}>
          <TagFilters tags={[{ name: "bob", enabled: true }]} />
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilLayout;
