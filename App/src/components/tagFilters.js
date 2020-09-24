import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function TagFilters({ tags, onTagClick }) {
  console.log("tags");
  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        {tags.map((tag, index) => (
          <Grid key={index} item>
            <Button
              key={index}
              color="secondary"
              variant={tag.enabled === true ? "contained" : "outlined"}
              onClick={() => onTagClick(tag.name)}
            >
              {tag.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
