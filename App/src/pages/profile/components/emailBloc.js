import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UPDATE_EMAIL_ROUTE, GET_EMAIL_ROUTE } from "../../../api/routes.js";
import { apiCall } from "../../../api/api_request.js";

function EmailBloc() {
  const [data, setData] = React.useState("");
  useEffect(() => {
    apiCall(GET_EMAIL_ROUTE, null, successGet, null, null, "GET");
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setData(value);
  };

  const successGet = (response) => {
    setData(response.data.email);
  };

  const renderTextField = (name, label) => {
    return (
      <TextField
        style={{ width: "70%" }}
        required
        id={name}
        name={name}
        label={label}
        value={data}
        onChange={handleChange}
      />
    );
  };

  const handleSubmit = () => {
    apiCall(UPDATE_EMAIL_ROUTE, { email: data }, null, null, null, "POST");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {renderTextField("email", "email")}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Valider
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmailBloc;
