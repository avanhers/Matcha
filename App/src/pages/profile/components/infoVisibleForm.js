import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import GenderRadio from "./genderRadio";
import OrientationRadio from "./orientationRadio";

import FormLabel from "@material-ui/core/FormLabel";

import Button from "@material-ui/core/Button";
export default function InfoVisibleForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information publique
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ width: "70%" }}
            required
            id="userName"
            name="userName"
            label="Login"
            autoComplete="login"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ width: "70%" }}
            required
            id="age"
            name="age"
            label="age"
            autoComplete="age"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ width: "70%" }}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ width: "70%" }}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <GenderRadio />
        </Grid>
        <Grid item xs={12}>
          <OrientationRadio />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Description</FormLabel>
          <TextField multiline={true} style={{ width: "70%" }} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Valider</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
