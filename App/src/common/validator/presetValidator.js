const checkPassword = (config) => {
  return (value) => {
    const passwdRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
    if (passwdRegex.test(value)) {
      return null;
    }
    return config.message;
  };
};

const required = (config) => {
  return (value) => {
    if (!value) {
      return config.message;
    }
    return null;
  };
};

const checkName = (config) => {
  return (name) => {
    const nameRegex = /^[a-z]{3,16}$/;
    if (nameRegex.test(name.value)) {
      return null;
    }
    return config.message;
    // name.error = "nom non valide";
  };
};

const checkUsername = (config) => {
  return (username) => {
    const usernameRegex = /^[a-z]{3,10}$/;

    if (usernameRegex.test(username.value)) {
      return null;
    }
    return config.message;
    // username.error = "Login non valide";
  };
};

const minLength = (config) => {
  return (value) => {
    if (value.length < config.value) {
      return config.message;
    }
    return null;
  };
};

const checkEqualPassword = (config) => {
  return (value, value2 = config.value) => {
    if (value !== value2) {
      return config.message;
    }
    return null;
  };
};

const checkMail = (config) => {
  return (mail) => {
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mailRegex.test(mail)) {
      return null;
    }
    return config.message;
    // mail.error = "email non valide. seulement en minuscule";
  };
};

const presetValidators = {
  required: required,
  checkPassword: checkPassword,
  checkEqualPassword: checkEqualPassword,
  checkName: checkName,
  checkMail: checkMail,
  minLength: minLength,
  checkUsername: checkUsername,
};

export default presetValidators;
