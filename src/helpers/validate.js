import validatejs from "validate.js";

const constraints = {
  email: {
    presence: true,
    email: {
      message: "Please enter a valid email address",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 5,
      message: "Your password must be at least 5 characters",
    },
  },
  name: {
    presence: { allowEmpty: false, message: "Please enter a name" },
  },
  username: {
    presence: true,
    length: {
      minimum: 5,
      message: "Your username must be at least 5 characters",
    },
  },
};

export const validate = (field, value) => {
  const errorMessage = validatejs.single(value, constraints[field]);
  return errorMessage ? errorMessage[0] : null;
};
