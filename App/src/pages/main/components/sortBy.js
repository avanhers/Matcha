import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";

export default function SortBy({ sortBy, setSortBy, orderBy, setOrderBy }) {
  const handleOrderClick = () => {
    if (orderBy === "ASC") {
      setOrderBy("DESC");
    } else {
      setOrderBy("ASC");
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="outlined-age-native-simple">Filtrer par</InputLabel>
        <Select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          labelId="outlined-age-native-simple"
          id="banane"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={"LENGTH(tags)"}>Tags en commun</MenuItem>
          <MenuItem value={"age"}>Age</MenuItem>
          <MenuItem value={"popularityScore"}>Score de popularité</MenuItem>
          <MenuItem value={"distance"}>Distance</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl>
        <InputLabel id="age-native">Filtrer par</InputLabel>
        <Select
          value={orderBy}
          onChange={(event) => setOrderBy(event.target.value)}
          labelId="age-native"
          id="fougere"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={"ASC"}>Croissant</MenuItem>
          <MenuItem value={"DESC"}>Décroissant</MenuItem>
        </Select>
      </FormControl> */}
      <IconButton
        color="primary"
        aria-label="upload picture"
        onClick={handleOrderClick}
      >
        {orderBy === "ASC" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </div>
  );
}
