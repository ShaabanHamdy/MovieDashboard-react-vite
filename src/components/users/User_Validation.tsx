import * as Yup from "yup";

export  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(/^(\S+@\S+\.\S+|\d{10,15})$/, "Must be a valid email"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$/,
        "At least 2 uppercase letters & 1 special character required"
      )
      .min(8, "Minimum 8 characters required")
      .required("Password is required"),
  });
 export const registerSchema = Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$/,
          "Password must contain at least two uppercase letters and one special character"
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    });
  