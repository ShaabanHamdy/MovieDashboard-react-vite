
import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, type SetStateAction } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import RegisterModal from "../register/Register";

interface LoginProps {
  saveUserData: () => void;
}

interface LoginValues {
  email: string;
  password: string;
}

interface ErrorResponse {
  Error: SetStateAction<string>;
  message: string;
}

const Login: React.FC<LoginProps> = ({ saveUserData }) => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [errorBack, setBackError] = useState("");
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
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

  const handleLogin = async (values: LoginValues) => {
    try {
      const { data } = await axios.post(
        "https://movie-dashboard-node.vercel.app/user/login",
        values
      );

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        saveUserData();
        navigate("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error("Login failed!");
      if (axiosError.response) {
        setBackError(axiosError.response.data.Error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600">🎬 Movie Hub</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and explore your favorite movies & TV shows
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-5">
            <div>
              <Field
                type="text"
                name="email"
                placeholder="Email address"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              {errorBack === "invalid email information" && (
                <div className="text-red-500 pt-1">{errorBack}</div>
              )}
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              {errorBack === "invalid password information" && (
                <div className="text-red-500 pt-1">{errorBack}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Log In
            </button>

            <div className="text-center text-sm text-gray-500 mt-2">
              Don't have an account?
            </div>

            <button
              type="button"
              className="w-full py-2 border rounded-md hover:bg-gray-100 transition cursor-pointer"
              onClick={() => setRegisterModalOpen(true)}
            >
              Create New Account
            </button>
          </Form>
        </Formik>
      </div>

      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setRegisterModalOpen(false)} />
      )}
    </div>
  );
};

export default Login;
