import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;

export const registrationFormValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 1 characters long!")
    .required("First name is required!"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters long!")
    .required("Last name is required!"),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string("Password must be a string!")
    .min(6, "Password must be at least 6 characters long!")
    .max(16, "Please use password less then 16 characters long!")
    .matches(passwordRules, {
      message:
        "Password must be at least one uppercase letter, one lowercase letter!"
    })
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password do't matched!")
    .required("Confirm password is required!"),
  phone: yup
    .string()
    .min(11, "Bangladeshi all phone number is 11 characters long!")
    .max(11, "Bangladeshi all phone number is 11 characters long!")
    .required("Phone number is required!"),
  address: yup
    .string()
    .min(2, "Address name must be at least 2 characters long!")
    .required("Address name is required!"),
  agreement: yup
    .boolean()
    .oneOf([true, "Please accept terms and condition first!"])
    .required("Please accept terms and condition first!")
});

export const loginFormValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string("Password must be a string!")
    .min(6, "Password must be at least 6 characters long!")
    .max(16, "Please use password less then 16 characters long!")
    .matches(passwordRules, {
      message:
        "Password must be at least one uppercase letter, one lowercase letter!"
    })
    .required("Password is required!")
});

export const forgotPasswordValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!")
});

export const resetPasswordValidation = yup.object().shape({
  password: yup
    .string("Password must be a string!")
    .min(6, "Password must be at least 6 characters long!")
    .max(16, "Please use password less then 16 characters long!")
    .matches(passwordRules, {
      message:
        "Password must be at least one uppercase letter, one lowercase letter!"
    })
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password do't matched!")
    .required("Confirm password is required!")
});

export const updateProfileValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 1 characters long!")
    .required("First name is required!"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters long!")
    .required("Last name is required!"),
  phone: yup
    .string()
    .min(11, "Bangladeshi all phone number is 11 characters long!")
    .max(11, "Bangladeshi all phone number is 11 characters long!")
    .required("Phone number is required!"),
  address: yup
    .string()
    .min(2, "Address name must be at least 2 characters long!")
    .required("Address name is required!"),
  oldPassword: yup
    .string("Password must be a string!")
    .min(6, "Password must be at least 6 characters long!")
    .max(16, "Please use password less then 16 characters long!")
    .matches(passwordRules, {
      message:
        "Password must be at least one uppercase letter, one lowercase letter!"
    })
    .required("Password is required!"),
  newPassword: yup
    .string("Password must be a string!")
    .min(6, "Password must be at least 6 characters long!")
    .max(16, "Please use password less then 16 characters long!")
    .matches(passwordRules, {
      message:
        "Password must be at least one uppercase letter, one lowercase letter!"
    }),
  // .required("Password is required!")
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password do't matched!")
  // .required("Confirm password is required!")
});
