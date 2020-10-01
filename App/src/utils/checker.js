export const checkMail = (mail) => {
  const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailRegex.test(mail)) {
    return true;
  }
  return false;
};

// 1 majuscule, 1 minuscule, 1 chiffre, 1 caractere special, longueur mini 8
export const checkPassword = (passwd) => {
  const passwdRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
  if (passwdRegex.test(passwd)) {
    return true;
  }
  return false;
};

export const checkEqualPassword = (passwd, passwd2) => {
  console.log("resultat:", passwd === passwd2);
  return passwd === passwd2;
};

//Login : lowercase alpha,  2 < taille < 10
export const checkUsername = (username) => {
  const usernameRegex = /^[a-z]{3,10}$/;

  if (usernameRegex.test(username)) {
    return true;
  }
  return false;
};

//Login :  lowercase alpha,  taille >=2 taille < 13
export const checkName = (name) => {
  const nameRegex = /^[a-z]{3,16}$/;
  if (nameRegex.test(name)) {
    return true;
  }
  return false;
};
