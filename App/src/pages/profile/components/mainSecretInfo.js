import React from "react";
import { render } from "react-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PasswordBloc from "./passwordBloc.js";
import EmailBloc from "./emailBloc.js";
function MainSecretInfo() {
  const handleSubmit = () => {
    console.log("click submit");
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <EmailBloc />
          </Grid>

          <Grid item xs={12}>
            <PasswordBloc />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
export default MainSecretInfo;
