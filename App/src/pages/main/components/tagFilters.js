import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useApiCall } from "../../../api/api_request.js";
import { GET_TAGS_ROUTE } from "../../../api/routes.js";

const apiCallConfig = {
  route: GET_TAGS_ROUTE,
  method: "GET",
};

// TODO quand on clean tout les tags et que ca se réinit aux défault on envoie vide a l'API

export default function TagFilters({ tags, onTagClick }) {
  const [defaultTags, setDefaultTags] = React.useState({
    tag1: false,
    tag2: false,
    tag3: false,
    tag4: false,
    tag5: false,
    tag6: false,
    tag7: false,
    tag8: false,
  });
  const [preventClickLoader, setPreventClickLoader] = React.useState(false);
  const apiCall = useApiCall(apiCallConfig);

  const successCallBack = (response) => {
    const newDefaultTags = {};
    response.data.tags.map((elem, index) => {
      newDefaultTags["tag" + (index + 1)] = elem ? "1" : "";
    });
    setDefaultTags(newDefaultTags);
  };

  React.useEffect(() => {
    apiCall(null, successCallBack, null, setPreventClickLoader);
  }, []);

  const handleTagClick = (key, type) => {
    if (type === "default") {
      if (defaultTags[key] === "") onTagClick(key);
      Object.keys(defaultTags).map((defaultKey) => {
        if (defaultKey !== key && defaultTags[defaultKey] === "1") {
          console.log("default key", defaultKey);
          onTagClick(defaultKey);
        }
      });
    } else {
      onTagClick(key);
    }
  };

  const emptyTags = () => {
    const res = Object.keys(tags).every((elem) => {
      return tags[elem] === "";
    });
    console.log("empty", res, defaultTags);
    return res;
  };

  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        {!emptyTags()
          ? Object.keys(tags).map((key, index) => (
              <Grid key={index} item>
                <Button
                  key={index}
                  color="secondary"
                  variant={tags[key] === "1" ? "contained" : "outlined"}
                  onClick={() => handleTagClick(key, "new")}
                  disabled={preventClickLoader}
                >
                  {key}
                </Button>
              </Grid>
            ))
          : Object.keys(defaultTags).map((key, index) => (
              <Grid key={index + 8} item>
                <Button
                  key={index}
                  color="secondary"
                  variant={defaultTags[key] === "1" ? "contained" : "outlined"}
                  onClick={() => handleTagClick(key, "default")}
                  disabled={preventClickLoader}
                >
                  {key}
                </Button>
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
}
