import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Demo from "./viewChart.js";

import { apiCallGet } from "../../../api/api_request.js";
// import PopularityScore from "../../../common/components/popularityScore.js";
import SingleLineGridList from "./singleLineGridList.js";
import Typography from "@material-ui/core/Typography";
import {
  GET_LIKES_ROUTE,
  GET_VIEWS_ROUTE,
  GET_MATCHES_ROUTE,
} from "../../../api/routes.js";
import Paper from "@material-ui/core/Paper";

function MainStat() {
  const successCall = (response, param) => {
    console.log(response);
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}></Grid>

        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#F9F7F7" }} variant="outlined">
            <Typography
              style={{
                paddingTop: "50px",
                fontSize: "40px",
                textAlign: "left",
              }}
            >
              Views
            </Typography>
          </Paper>
          <SingleLineGridList route={GET_VIEWS_ROUTE} />
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#F9F7F7" }} variant="outlined">
            <Typography
              style={{
                paddingTop: "50px",
                fontSize: "40px",
                textAlign: "left",
              }}
            >
              Like
            </Typography>
          </Paper>
          <SingleLineGridList route={GET_LIKES_ROUTE} />
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#F9F7F7" }} variant="outlined">
            <Typography
              style={{
                paddingTop: "50px",
                fontSize: "40px",
                textAlign: "left",
              }}
            >
              Match
            </Typography>
          </Paper>
          <SingleLineGridList route={GET_MATCHES_ROUTE} />
        </Grid>
      </Container>
    </Container>
  );
}
export default MainStat;
