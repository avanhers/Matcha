import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Demo from "./viewChart.js";
import { GET_LIKES_ROUTE } from "../../../api/routes.js";
import { apiCallGet } from "../../../api/api_request.js";
// import PopularityScore from "../../../common/components/popularityScore.js";
function MainStat() {

  const successCall = (response, param) => {
    console.log(response)
  }
  apiCallGet(GET_LIKES_ROUTE, successCall, null, null, null);

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}></Grid>
        <Grid item xs={12}>
          <Demo />
        </Grid>
      </Container>
    </Container>
  );
}
export default MainStat;
