import React from "react";

import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { UPDATE_TAGS } from "../../../api/routes.js";
import apiCall from "../../../api/api_request.js";

const initialTags = [
  { label: "tag1", value: true },
  { label: "tag2", value: true },
  { label: "tag3", value: true },
  { label: "tag4", value: false },
  { label: "tag5", value: true },
  { label: "tag6", value: false },
  { label: "tag7", value: true },
  { label: "tag8", value: true },
];

const getTagsArray = (tags) => {
  return tags.filter((i) => i.value === true).map((i) => i.label);
};

function TagsList() {
  const [tags, setTags] = React.useState(initialTags);

  const handleClick = (index) => {
    const ne = tags.map((elem, ind) =>
      index === ind
        ? {
            ...elem,
            value: !elem.value,
          }
        : elem
    );
    setTags(ne);
  };

  const handleSubmit = () => {
    const data = { tags: getTagsArray(tags) };
    apiCall(UPDATE_TAGS, data, null, null, null, "POST", true);
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {tags.map((tag, i) => (
          <Grid key={tag.label} item xs={6} md={12}>
            <Chip
              label={tag.label}
              clickable={true}
              color={tag.value === true ? "primary" : "default"}
              onClick={() => handleClick(i)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default TagsList;
