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
import { GET_PROFILE } from "../../../api/routes.js";
import { useApiCall } from "../../../api/api_request.js";

const useStyles = makeStyles((theme) => ({
  myPaper: {
    backgroundColor: "#F9F7F7",
  },
}));

const images = [
  {
    img: profilPlaceholder,
    id: 1,
    bddId: -1,
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
const defaultUser = {
  age: 18,
  avatar: "",
  connectedAt: "2020-10-27T09:53:08.000Z",
  description: "ok",
  firstname: "jules",
  gender: "male",
  images: [profilPlaceholder],
  isBlocked: false,
  isLiked: false,
  isLogin: 1,
  isReported: false,
  latitude: 0,
  longitude: 0,
  name: "jules",
  popularityScore: 83.1,
  sexualOrientation: "bi",
  username: "jules",
};
const formatImage = (item) => {
  if (item && item.substr(0, 5) != "https") {
    return "http://localhost/api".concat(item.slice(7));
  } else return item;
};

function renderProfilPicture(url) {
  console.log(formatImage(url));
  return (
    <Avatar
      alt="Avatar"
      src={formatImage(url)}
      sizes="large"
      style={{ height: "auto", width: "75%", textAlign: "-webkit-center" }}
    />
  );
}

function MainOtherProfile({ match }) {
  const classes = useStyles();
  const [user, setUser] = React.useState(defaultUser);

  const username = match.params.username;
  const configGetProfile = { route: GET_PROFILE + username, method: "GET" };
  const apiCallProfile = useApiCall(configGetProfile);
  const coord = { lat: user.latitude, lng: user.longitude, zoom: 11 };

  useEffect(() => {
    apiCallProfile(null, successCall);
  }, []);

  console.log(user);
  const successCall = (response) => {
    setUser(response.data.user);
    console.log(response.data.user);
  };

  const renderImage = (image) => {
    if (image)
      return (
        <GridListTile key={image} cols={1}>
          <img alt={"img".concat(image)} src={formatImage(image)} />
        </GridListTile>
      );
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={8} md={5}>
            {renderProfilPicture(user.avatar)}
          </Grid>
          <Grid item xs={4} md={2}>
            <ActionBloc user={user} />
          </Grid>
          <Grid item xs={12} md={5}>
            <MyMap
              data={{ lat: user.latitude, lng: user.longitude, zoom: 15 }}
            ></MyMap>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.myPaper}>
              <Info user={user} />
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
                  <Typography variant="caption">{user.description}</Typography>
                </Grid>
              </Paper>
            </React.Fragment>
          </Grid>
          <Grid item xs={12}>
            <GridList cols={2}>
              {user.images.map((image, index) => renderImage(image))}
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainOtherProfile;
