import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { UPDATE_PASSWORD_ROUTE } from "../../../api/routes.js";
import Button from "@material-ui/core/Button";
import apiCall from "../../../api/api_request.js";
import useValidation from "../../../common/validator/validatorHook.js";

const validatorConfig = {
  fields: {
    oldPwd: {
      required: { message: "Ce champs est obligatoire" },
    },
    newPwd: {
      required: { message: "Ce champs est obligatoire" },
      checkPassword: {
        message:
          "Le mot de passe doit contenir au moins 8 caractères avec au minimum: une minuscule,  une majuscule, un chiffre, 1 caractère special",
      },
    },
    confirmPwd: {
      required: { message: "Ce champs est obligatoire" },
      checkEqualPassword: (fieldsValue) => {
        return {
          value: fieldsValue.newPwd,
          message: "Les mots de passe ne correspondent pas",
        };
      },
    },
  },
  errorConfig: ["blur", "submitted"],
};

function PasswordBloc() {
  const { getFieldProps, errors, onSubmitVal, showError } = useValidation(
    validatorConfig
  );

  const renderTextField = (name, label) => {
    return (
      <TextField
        style={{ width: "70%" }}
        required
        id={name}
        label={label}
        type="password"
        error={showError(name) && !!errors[name]}
        helperText={(showError(name) && errors[name]) || " "}
        {...getFieldProps(name)}
      />
    );
  };

  const handleSubmit = (rep) => {
    console.log(rep);
    console.log("youhouh");
    const param = {
      password: rep.newPwd,
      oldPassword: rep.oldPwd,
    };
    apiCall(UPDATE_PASSWORD_ROUTE, param, null, null, null, "POST");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {renderTextField("oldPwd", "oldPwd", "pwd")}
      </Grid>
      <Grid item xs={12}>
        {renderTextField("newPwd", "newPwd", "pwd")}
      </Grid>
      <Grid item xs={12}>
        {renderTextField("confirmPwd", "confirmPwd", "pwd")}
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

export default PasswordBloc;
