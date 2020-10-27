import Grid from "@material-ui/core/Grid";
import React from "react";
import { Typography } from "@material-ui/core";
const initialState = {
  username: "",
  name: "",
  firstname: "",
  gender: "",
  sexualOrientation: "",
  description: "",
  age: 12,
};

function Info() {
  const data = initialState;

  function renderField(name, value) {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption">{name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">{value}</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <b>Information publique</b>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderField("username", "tata")}
        </Grid>
        <Grid item xs={12}>
          {renderField("Prenom", "tata")}
        </Grid>
        <Grid item xs={12}>
          {renderField("Nom", "tata")}
        </Grid>
        <Grid item xs={12}>
          {renderField("age", "16")}
        </Grid>
        <Grid item xs={12}>
          {renderField("orientation", "bi")}
        </Grid>
        <Grid item xs={12}>
          {renderField("sexe", "16")}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Info;
