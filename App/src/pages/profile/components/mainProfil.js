import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import InfoVisibleForm from "./infoVisibleForm.js";
import TagsList from "./tagsList.js";
import ListImages from "./listImages.js";
import { apiCall, apiCallPost } from "../../../api/api_request.js";
import profilPlaceholder from "../../../assets/images/profilPlaceholder.jpg";
import { CHANGE_AVATAR_ROUTE, GET_AVATAR_ROUTE } from "../../../api/routes.js";

/*
 ********************** CSS STYLE *****************************
 */

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
const initialAvatar = {
  path: profilPlaceholder,
  id: -1,
};

/*
 ********************** Component *****************************
 */

function MainProfile() {
  const classes = useStyles();
  const [avatar, setAvatar] = React.useState(initialAvatar);

  useEffect(() => {
    apiCall(GET_AVATAR_ROUTE, null, successGetAvatar, null, null, "GET", true);
  }, []);

  const successGetAvatar = (response) => {
    console.log(response);
    if (response.data.avatar.id > 0)
      setAvatar({
        path: "http://localhost/api".concat(response.data.avatar.path.slice(7)),
        id: response.data.avatar.id,
      });
  };

  const changeAvatar = (image) => {
    apiCallPost(
      CHANGE_AVATAR_ROUTE.concat("/").concat(image.bddId),
      image.bddId,
      successChangeAvatar,
      image,
      null,
      null
    );

    console.log(avatar);
  };

  const successChangeAvatar = (response, image) => {
    setAvatar({ path: image.img, id: image.bddId });
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={8} md={5}>
            {renderProfilPicture(avatar.path)}
          </Grid>
          <Grid item xs={4} md={2}></Grid>
          <Grid item xs={12} md={5}>
            {/*empty space in my grid*/}
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.myPaper}>
              <InfoVisibleForm />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.myPaper}>
              <TagsList />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper>
              <ListImages avatar={avatar} changeAvatar={changeAvatar} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainProfile;
