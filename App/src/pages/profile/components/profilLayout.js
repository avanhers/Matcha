import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextFieldModifier from "../../../common/components/textFieldModifier";
import TagFilters from "../../main/components/tagFilters.js";
import ProfileImages from "./profileImages.js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Typography from "@material-ui/core/Typography";

import CustomSelect from "../../../common/components/customSelect.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textFieldModifier: {
    textAlign: "left",
  },
  image: {
    textAlign: "-webkit-center",
  },
  scoreBoxFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function renderProfilPicture(url) {
  return (
    <Avatar
      alt="Remy Sharp"
      src={url}
      sizes="large"
      style={{ height: "auto", width: "100%", textAlign: "-webkit-center" }}
    />
  );
}

function ProfilLayout({ user }) {
  const classes = useStyles();

  const userVar = {
    ...user,
    preferences: "hétéro",
    tags: [
      {
        name: "sex",
        enabled: true,
      },
      {
        name: "rock",
        enabled: true,
      },
      {
        name: "sleep",
        enabled: true,
      },
      {
        name: "eat",
        enabled: true,
      },
      {
        name: "dance",
        enabled: true,
      },
    ],
    image: [
      "https://blog.1001pharmacies.com/wp-content/uploads/2012/05/patates-photo-e1338474856573.jpg",
    ],
    description: "J'aime les saucisses.",
    password: "pasteque",
  };

  const handleTagClick = (name) => {
    // setUser({
    //   ...user,
    //   tags: user.tags.map((tag) =>
    //     tag.name === name
    //       ? {
    //           ...tag,
    //           enabled: !tag.enabled,
    //         }
    //       : tag
    //   ),
    // });
  };

  const [age, setAge] = React.useState("");

  const handleChange = (name, value) => {
    // setUser({
    //   ...user,
    //   [name]: value,
    // });
  };

  return (
    <div className={classes.root}>
      {/* Container of the page */}
      <Grid container className={classes.grid} spacing={3}>
        {/* Left Part of the screen (image profile) and change information */}
        <Grid
          item
          container
          direction="column"
          spacing={1}
          xs={12}
          sm={4}
          style={{ height: "95vh" }}
        >
          <Paper style={{ height: "99%" }}>
            {/*  Image profile */}
            <Grid className={classes.image} item>
              {renderProfilPicture(userVar.image[0])}
            </Grid>
            {/*  TextField modifier */}
            <Grid item>
              <TextFieldModifier
                fieldName={"Nom"}
                fieldValue={userVar.lastName}
              />
              <TextFieldModifier
                fieldName={"Prenom"}
                fieldValue={userVar.firstName}
              />
              <TextFieldModifier
                fieldName={"Email"}
                fieldValue={userVar.email}
              />
              <TextFieldModifier fieldName={"Age"} fieldValue={userVar.age} />
            </Grid>
          </Paper>
        </Grid>
        {/*  Right Container */}
        <Grid item xs={12} sm={8} container direction="column" spacing={3}>
          <Grid item container spacing={1}>
            <Grid item xs={6}>
              <Paper>
                <div className={classes.scoreBoxFlex}>
                  <Avatar style={{ color: "pink", backgroundColor: "red" }}>
                    <FavoriteBorderIcon />
                  </Avatar>

                  <Typography variant="h2">42</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>Test2</Paper>
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={6}>
              <Paper>
                <CustomSelect
                  userKey="sexe"
                  fieldName="Sexe"
                  fieldValue={userVar.sexe}
                  fieldChoice={["homme", "femme", "autre"]}
                  handleChange={handleChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <CustomSelect
                  userKey="preferences"
                  fieldName="Préférence sexuelles"
                  fieldValue={userVar.preferences}
                  fieldChoice={["hétéro", "homo", "bi"]}
                  handleChange={handleChange}
                  minWidth={180}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item>
            <Paper>
              <TextFieldModifier
                fieldName={"Description"}
                fieldValue={userVar.description}
                textArea
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <TagFilters tags={userVar.tags} onTagClick={handleTagClick} />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <ProfileImages />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilLayout;
