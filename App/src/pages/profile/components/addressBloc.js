import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
function AddressBloc({ handleSubmit }) {
  const [address, setAddress] = React.useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setAddress(value);
  };
  return (
    <form>
      <div>
        <TextField
          style={{ width: "70%", paddingBottom: "5px" }}
          id="addresse"
          name="addresse"
          label="addresse"
          value={address}
          onChange={handleChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={(e) => handleSubmit(address)}
        >
          <CheckIcon />
        </IconButton>
      </div>
    </form>
  );
}
export default AddressBloc;
