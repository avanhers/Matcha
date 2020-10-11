import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import GenderRadio from "./genderRadio";
import OrientationRadio from "./orientationRadio";

import FormLabel from "@material-ui/core/FormLabel";

import Button from "@material-ui/core/Button";

export default function InfoVisibleForm() {

  const renderTextField = (name, label, type) => {
    return (<TextField
      style={{ width: "70%" }}
      required
      id={name}
      name={name}
      label={label}
      autoComplete={label}
      type={type}
    />)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information publique
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {renderTextField("userName", "Login", "text")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("age", "age", "number")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("firstName", "prenom", "text")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("lastName", "nom", "text")}
        </Grid>
        <Grid item xs={12}>
          <GenderRadio />
        </Grid>
        <Grid item xs={12}>
          <OrientationRadio />
        </Grid>
        <Grid item xs={12}>
          <TextField multiline={true}
            style={{ width: "90%" }}
            id="Description"
            name="Description"
            label="Description" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Valider</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
