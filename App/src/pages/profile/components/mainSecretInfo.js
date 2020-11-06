import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import PasswordBloc from "./passwordBloc.js";
import EmailBloc from "./emailBloc.js";
function MainSecretInfo() {


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
