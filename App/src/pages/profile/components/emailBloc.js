import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UPDATE_EMAIL_ROUTE, GET_EMAIL_ROUTE } from "../../../api/routes.js";
import { apiCall } from "../../../api/api_request.js";
import useValidation from "../../../common/validator/validatorHook.js";

const validatorConfig = {
  fields: {
    email: {
      required: { message: "Ce champs est obligatoire" },
      checkMail: { message: "mail non valide" },
    },
  },
  errorConfig: ["blur", "submitted"],
};

function EmailBloc() {
  const [data, setData] = React.useState("");
  const {
    getFieldProps,
    errors,
    onSubmitVal,
    showError,
    setValue,
  } = useValidation(validatorConfig);

  useEffect(() => {
    apiCall(GET_EMAIL_ROUTE, null, successGet, null, null, "GET");
  }, []);

  const successGet = (response) => {
    setValue("email", response.data.email);
  };

  const renderTextField = (name, label) => {
    return (
      <TextField
        style={{ width: "70%" }}
        required
        id={name}
        label={label}
        error={showError(name) && !!errors[name]}
        helperText={(showError(name) && errors[name]) || " "}
        {...getFieldProps(name)}
      />
    );
  };

  const handleSubmit = (value) => {
    apiCall(
      UPDATE_EMAIL_ROUTE,
      { email: value.email },
      null,
      null,
      null,
      "POST"
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {renderTextField("email", "email")}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={(event) => onSubmitVal(event, handleSubmit)}
        >
          Valider
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmailBloc;
