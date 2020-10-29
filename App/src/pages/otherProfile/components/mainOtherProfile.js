import React, { useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import ActionBloc from "./actionBloc.js";
import MyMap from "../../profile/components/myMap.js";
import Info from "./info.js";
import Chip from "@material-ui/core/Chip";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {} from "../../../api/routes.js";
import {
  GET_PROFILE,
  LIKE_USER,
  UNLIKE_USER,
  BLOCK_USER,
  SIGNAL_USER,
} from "../../../api/routes.js";
import { useApiCall } from "../../../api/api_request.js";

const useStyles = makeStyles((theme) => ({
  myPaper: {
    backgroundColor: "#F9F7F7",
  },
}));

const defaultUser = {
  age: 18,
  avatar: "",
  connectedAt: "2020-10-27T09:53:08.000Z",
  description: "ok",
  firstname: "jules",
  gender: "male",
  images: [""],
  isBlocked: false,
  isLiked: false,
  isLogin: 1,
  isReported: false,
  latitude: 0,
  longitude: 0,
  name: "jules",
  popularityScore: 83.1,
  sexualOrientation: "bi",
  username: "error",
  tags: [
    { label: "tag1", value: false },
    { label: "tag2", value: false },
    { label: "tag3", value: false },
    { label: "tag4", value: false },
    { label: "tag5", value: false },
    { label: "tag6", value: false },
    { label: "tag7", value: false },
    { label: "tag8", value: false },
  ],
};

const formatImage = (item) => {
  if (item && item.substr(0, 5) != "https") {
    return "http://localhost/api".concat(item.slice(7));
  } else return item;
};

function renderProfilPicture(url) {
  return (
    <Avatar
      alt="Avatar"
      src={formatImage(url)}
      sizes="large"
      style={{ height: "auto", width: "75%", textAlign: "-webkit-center" }}
    />
  );
}

const apiLikeUserConfig = {
  route: LIKE_USER,
  method: "POST",
};

const apiUnlikeUserConfig = {
  route: UNLIKE_USER,
  method: "POST",
};

function MainOtherProfile({ match, socket }) {
  const classes = useStyles();
  const [user, setUser] = React.useState(defaultUser);
  const [likeDisabledLoader, setLikeDisabledLoader] = React.useState(false);
  const likeUser = useApiCall(apiLikeUserConfig);
  const unlikeUser = useApiCall(apiUnlikeUserConfig);

  const username = match.params.username;

  const configGetProfile = { route: GET_PROFILE + username, method: "GET" };

  const blockUserConfig = { route: BLOCK_USER + username, method: "POST" };
  const reportUserConfig = { route: SIGNAL_USER + username, method: "POST" };
  const apiCallProfile = useApiCall(configGetProfile);
  const apiBlockProfil = useApiCall(blockUserConfig);
  const apiReportProfil = useApiCall(reportUserConfig);
  const coord = { lat: user.latitude, lng: user.longitude, zoom: 16 };

  useEffect(() => {
    apiCallProfile(null, successCallGetProfile);
  }, []);

  const successCallGetProfile = (response) => {
    console.log(response);
    setUser(response.data.user);
  };

  const handleLikeClick = (event) => {
    if (event.target.checked) {
      console.log("like");
      likeUser(
        { urlParams: user.username },
        successLike,
        null,
        setLikeDisabledLoader
      );
    } else {
      console.log("Unlike");
      unlikeUser(
        { urlParams: user.username },
        successUnlike,
        null,
        setLikeDisabledLoader
      );
    }
    setUser({ ...user, isLiked: !user.isLiked });
  };

  const successLike = (response) => {
    if (response.data.status) {
      const status = response.data.status;
      if (status === 201) {
        if (socket)
          socket.emit("notification", { type: "like", target: user.username });
      } else if (status === 202) {
        if (socket)
          socket.emit("notification", { type: "match", target: user.username });
      }
    }

    console.log("like success");
  };
  const successUnlike = (response) => {
    console.log("unlike success");
  };

  const handleClickBlock = () => {
    apiBlockProfil(user.username);
    setUser({ ...user, isBlocked: !user.isBlocked });
  };

  const handleClickReport = () => {
    apiReportProfil(user.username, successReport);
  };
  const successReport = (response) => {
    if (response.data.status == 200) {
      setUser({ ...user, isReported: !user.isReported });
    }
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
            <ActionBloc
              user={user}
              clickLike={handleLikeClick}
              clickBlock={handleClickBlock}
              clickReport={handleClickReport}
            />
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
                  {user.tags.map((tag, i) => (
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
              {user.images.map((image) => renderImage(image))}
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainOtherProfile;
