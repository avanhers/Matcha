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
  GET_MATCH_ROUTE,
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
            <Typography style={{ paddingTop: "50px", fontSize: "40px" }}>
              Views
            </Typography>
          </Paper>
          <SingleLineGridList route={GET_VIEWS_ROUTE} />
        </Grid>
        {/* <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#F9F7F7" }} variant="outlined">
            <Typography style={{ paddingTop: "50px", fontSize: "40px" }}>
              Like
            </Typography>
          </Paper>
          <SingleLineGridList />
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#F9F7F7" }} variant="outlined">
            <Typography style={{ paddingTop: "50px", fontSize: "40px" }}>
              Match
            </Typography>
          </Paper>
          <SingleLineGridList />
        </Grid> */}
      </Container>
    </Container>
  );
}
export default MainStat;
