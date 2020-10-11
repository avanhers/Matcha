import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InfoVisibleForm from "./infoVisibleForm.js";
import TagsList from "./tagsList.js";
import ListImages from "./listImages.js";

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
      alt="Remy Sharp"
      src={url}
      sizes="large"
      style={{ height: "auto", width: "75%", textAlign: "-webkit-center" }}
    />
  );
}

/*TODO BACK: 
check if login allready exist
delete image by img_url
add_image
set image as avatar
 */
//::TODO FRONT: check if all field are valid

/*
 ********************** Component *****************************
 */

function MainProfile() {
  const classes = useStyles();

  return (
    <Container>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            {renderProfilPicture(
              "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg"
            )}
          </Grid>
          <Grid item xs={12} md={7}>
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
              <ListImages />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default MainProfile;
