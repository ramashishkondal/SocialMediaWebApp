const emailRegex =
  /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const isNotValidEmail = (email: string) => !emailRegex.test(email);

export const isValidPassword = {
  lengthCheck: (password: string) => password.length >= 6,
  caseCheck: (password: string) => /[A-Z]/.test(password),
  numberCheck: (password: string) => /[0-9]/.test(password),
  specialCharacterCheck: (password: string) => /[^a-zA-Z0-9_]/.test(password),
  checkAllValidations: (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9_]/.test(password),
};

const nameRegex = /^[a-zA-Z\s]*$/;
export const isNotValidName = (name: string) => !RegExp(nameRegex).test(name);
