import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function SortBy({ sortBy, setSortBy }) {
  console.log(sortBy);
  return (
    <div>
      <InputLabel id="outlined-age-native-simple">Filtrer par</InputLabel>
      <Select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        labelId="outlined-age-native-simple"
      >
        <MenuItem aria-label="None" value="" />
        <MenuItem value={"LENGTH(tags)"}>Tags en commun</MenuItem>
        <MenuItem value={"age"}>Age</MenuItem>
        <MenuItem value={"popularityScore"}>Score de popularité</MenuItem>
        <MenuItem value={"age"}>Distance</MenuItem>
      </Select>
    </div>
  );
}
