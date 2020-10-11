import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import GenderRadio from "./genderRadio";
import OrientationRadio from "./orientationRadio";

import Button from "@material-ui/core/Button";
import { PERSONNAL_INFO_ROUTE } from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";

/*
 ********************** InitialState *****************************
 */

const initialState = {
  username: "",
  name: "",
  firstname: "",
  gender: "female",
  sexualOrientation: "bi",
  description: "",
};

/*
 ********************** Component *****************************
 */

export default function InfoVisibleForm() {
  const [data, setData] = React.useState(initialState);

  /********         Method            ********/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleClickGender = (event) => {
    const { id } = event.target;
    setData({ ...data, gender: id });
  };

  const handleClickOrientation = (event) => {
    const { id } = event.target;
    setData({ ...data, sexualOrientation: id });
  };

  const handleSubmit = () => {
    const send = { infos: data };
    apiCall(PERSONNAL_INFO_ROUTE, send, null, null, null, "POST", true);
  };

  /********         START OF RENDERING            ********/
  const renderTextField = (name, label, type) => {
    return (
      <TextField
        style={{ width: "70%" }}
        required
        id={name}
        name={name}
        label={label}
        value={data[name]}
        type={type}
        onChange={handleChange}
      />
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information publique
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {renderTextField("username", "Login", "text")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("age", "age", "number")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("firstname", "prenom", "text")}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField("name", "nom", "text")}
        </Grid>
        <Grid item xs={12}>
          <GenderRadio gender={data.gender} handleClick={handleClickGender} />
        </Grid>
        <Grid item xs={12}>
          <OrientationRadio
            orientation={data.sexualOrientation}
            handleClick={handleClickOrientation}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline={true}
            style={{ width: "90%" }}
            id="description"
            name="description"
            label="Description"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
