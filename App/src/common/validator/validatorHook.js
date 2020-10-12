import { useReducer, useEffect } from "react";
import { validationReducer, initialState } from "./validatorReducer";
import presetValidators from "./presetValidator";

export default function useValidation(config) {
  const [state, dispatch] = useReducer(validationReducer, initialState);

  const validateField = (fieldConfig, fieldValue) => {
    let error = "";
    for (const validatorName in fieldConfig) {
      if (validatorName === "custom") {
        const validatorConfig =
          typeof fieldConfig[validatorName].config === "function"
            ? fieldConfig[validatorName].config(state.value)
            : fieldConfig[validatorName].config;
        const configuredValidator = fieldConfig[validatorName].callback(
          validatorConfig
        );
        error = configuredValidator(fieldValue);
      } else if (presetValidators[validatorName]) {
        const validatorConfig =
          typeof fieldConfig[validatorName] === "function"
            ? fieldConfig[validatorName](state.value)
            : fieldConfig[validatorName];

        const configuredValidator = presetValidators[validatorName](
          validatorConfig
        );
        error = configuredValidator(fieldValue);
      }
      if (error) {
        return error;
      }
    }
  };

  const validateFields = (config) => {
    let errors = {};
    for (const fieldName in config.fields) {
      const fieldConfig = config.fields[fieldName];
      const fieldValue = state.value[fieldName];
      errors[fieldName] = validateField(fieldConfig, fieldValue);
    }
    return errors;
  };

  useEffect(() => {
    const errors = validateFields(config);
    dispatch({ type: "VALIDATE", payload: errors });
  }, [state.value]);

  return {
    submitted: state.submitted,
    errors: state.error,
    focus: state.focus,
    showError: (fieldName) => {
      let showError = true;
      let errorConfig = Array.isArray(config.errorConfig) && config.errorConfig;
      if (errorConfig) {
        config.errorConfig.map((cond) => {
          if (cond === "submitted") {
            showError = showError && state.submitted;
          } else if (cond === "blur") {
            showError = showError && !state.focus[fieldName];
          }
        });
      }
      return showError;
    },
    getFieldProps: (fieldName) => {
      return {
        name: fieldName,
        value: state.value[fieldName] ? state.value[fieldName] : "",
        onChange: (event) => {
          dispatch({
            type: "CHANGE",
            payload: { [fieldName]: event.target.value },
          });
        },
        onFocus: (event) => {
          dispatch({
            type: "FOCUS",
            payload: { [fieldName]: true },
          });
        },
        onBlur: (event) => {
          dispatch({
            type: "FOCUS",
            payload: { [fieldName]: false },
          });
        },
      };
    },
    onSubmitVal: (event, submitFunction) => {
      event.preventDefault();
      dispatch({ type: "SUBMIT", payload: true });
      if (Object.keys(state.error).every((k) => !state.error[k])) {
        if (config.onSubmit) {
          config.onSubmit();
        }
        if (submitFunction) {
          submitFunction(state.value);
        }
      }
    },
  };
}
