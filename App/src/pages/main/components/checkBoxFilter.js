import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
function CheckBoxFilter({ filterStatus, toggleFilter }) {

  const handleChange = (event) => {
    toggleFilter();
  };

  return (
    <div>
      Use Personnal Filter :
      <Checkbox
        checked={filterStatus}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
export default CheckBoxFilter;
