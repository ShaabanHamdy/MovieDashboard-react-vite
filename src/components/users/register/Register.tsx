import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import * as Yup from "yup";

interface RegisterProps {
  onClose: () => void;
}
interface ErrorResponse {
  Error: SetStateAction<string>;
  message: string;
}

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [errorBack, setBackError] = useState("");

  const registerSchema = Yup.object().shape({
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

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await axios.post("https://movie-dashboard-node.vercel.app/user/signup", values);
      toast.success("Registration successful!");
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error("Registration failed. Please try again.");
      if (axiosError.response) {
        setBackError(axiosError.response.data.Error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <FaUserPlus className="text-2xl" />
            <h2 className="text-lg font-bold tracking-wide">Join MovieDash</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 text-xl font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <Formik<RegisterFormValues>
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            <Form className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input-style"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-text"
                  />
                </div>
                <div className="flex-1">
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input-style"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-text"
                  />
                </div>
              </div>

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input-style"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-text"
              />
              {errorBack === "email already exist" && (
                <div className="error-text">{errorBack}</div>
              )}

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-style"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-text"
              />

              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input-style"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-text"
              />

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
              >
                Create Account
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Tailwind helper styles */}
      <style>{`
        .input-style {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          outline: none;
          transition: border 0.2s;
        }
        .input-style:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 1px #6366f1;
        }
        .error-text {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default Register;
