import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Demo from "./viewChart.js";
// import PopularityScore from "../../../common/components/popularityScore.js";
function MainStat() {
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
