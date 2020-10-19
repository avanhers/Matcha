import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
function AddressBloc({ handleSubmit }) {
  const [address, setAddress] = React.useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setAddress(value);
  };
  return (
    <div>
      <TextField
        style={{ width: "70%" }}
        id="addresse"
        name="addresse"
        label="addresse"
        value={address}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={(e) => handleSubmit(address)}>
        Valider
      </Button>
    </div>
  );
}
export default AddressBloc;
