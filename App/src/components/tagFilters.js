import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function TagFilters({ tags, onTagClick }) {
  const [id, setId] = React.useState(0);

  React.useEffect(() => {}, []);

  const renderTags = () =>
    tags.map((tag, index) => (
      <Grid key={index} item>
        <Button
          key={index}
          variant={tag.enabled ? "contained" : "outlined"}
          color="secondary"
          onClick={() => onTagClick(tag.name)}
        >
          {tag.name}
        </Button>
      </Grid>
    ));

  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        {renderTags()}
      </Grid>
    </Grid>
  );
}
