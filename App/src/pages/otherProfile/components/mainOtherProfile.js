import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import ActionBloc from "./actionBloc.js";
import MyMap from "../../profile/components/myMap.js";
import Info from "./info.js";
import Chip from "@material-ui/core/Chip";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  myPaper: {
    backgroundColor: "#F9F7F7",
  },
}));

function renderProfilPicture(url) {
  return (
    <Avatar
      alt="Avatar"
      src={url}
      sizes="large"
      style={{ height: "auto", width: "75%", textAlign: "-webkit-center" }}
    />
  );
}
const images = [
  {
    img: profilPlaceholder,
    id: 1,
    bddId: -1,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 2,
    bddId: -2,
    placeholder: true,
  },
  {
    img: profilPlaceholder,
    id: 3,
    bddId: -3,
    placeholder: true,
  },
];
const tags = [
  { label: "tag1", value: false },
  { label: "tag2", value: false },
  { label: "tag3", value: true },
  { label: "tag4", value: false },
  { label: "tag5", value: true },
  { label: "tag6", value: false },
  { label: "tag7", value: false },
  { label: "tag8", value: false },
];
function MainOtherProfile({ match }) {
  const classes = useStyles();
  const username = match.params.username;
  console.log(username);
  const coord = { lat: 60, lng: 16, zoom: 15 };
  //useEffect(() => {}, []);

  const renderImage = (image) => {
    if (image)
      return (
        <GridListTile key={image.id} cols={1}>
          <img alt={"img".concat(image.id)} src={profilPlaceholder} />
        </GridListTile>
      );
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={8} md={5}>
            {renderProfilPicture(profilPlaceholder)}
          </Grid>
          <Grid item xs={4} md={2}>
            <ActionBloc />
          </Grid>
          <Grid item xs={12} md={5}>
            <MyMap data={coord}></MyMap>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.myPaper}>
              <Info />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.myPaper}>
              <Container>
                <Grid container spacing={3}>
                  {tags.map((tag, i) => (
                    <Grid key={tag.label} item xs={6}>
                      <Chip
                        label={tag.label}
                        clickable={false}
                        color={tag.value == true ? "primary" : "default"}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <React.Fragment>
              <Paper className={classes.myPaper}>
                <Grid item xs={12}>
                  <Typography variant="h6">Description</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">
                    aadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaadfdsfaad
                    fdsfaadfdsfaadfdsfaadfdsfaadfdsf
                  </Typography>
                </Grid>
              </Paper>
            </React.Fragment>
          </Grid>
          <Grid item xs={12}>
            <GridList cols={2}>
              {images.map((image) => renderImage(image))}
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainOtherProfile;
