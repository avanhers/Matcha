import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import InfoVisibleForm from "./infoVisibleForm.js";
import TagsList from "./tagsList.js";
import ListImages from "./listImages.js";
import apiCall from "../../../api/api_request.js";
import { GET_AVATAR_ROUTE, CHANGE_AVATAR_ROUTE } from "../../../api/routes.js";
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

/*TODO BACK: 
check if login allready exist : error 401
  In server.js: 
        add : const cors = require("cors"); 
              app.options("*", cors());   after the first app.use
 JWT : add JSON.parse() in auth.js inside verify
       add  JSON.parse() in jwt.js
       comment gesture of Token in case of forget pwd
  


 */
//::TODO FRONT: check if all field are valid

/*
 ********************** Component *****************************
 */

function MainProfile() {
  const classes = useStyles();
  const [avatar, setAvatar] = React.useState(null);

  // apiCall(GET_AVATAR_ROUTE,null,succesGetAvatar,null,"POST",true);

  // const successGetAvatar = (response)=>{
  //   setAvatar(response.body.avatar)
  // }
  const handleClickChangeAvatar = (event) => {
    apiCall(CHANGE_AVATAR_ROUTE, avatar, null, null, null, "POST", true);
    setAvatar(event.value);
  };

  return (
    <Container>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={8} md={5}>
            {renderProfilPicture(
              "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg"
            )}
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
              <ListImages
                avatar={avatar}
                handleClickAvatar={handleClickChangeAvatar}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainProfile;
