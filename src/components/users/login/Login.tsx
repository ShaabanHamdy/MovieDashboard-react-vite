import { Form, Formik } from "formik";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { ContainerContext } from "../../context/MoviesContext";
import FormInput from "../FormInput"; // New reusable component
import RegisterModal from "../register/Register";
import { loginSchema } from "../User_Validation";

const Login = () => {
  const { handleLogin, isRegisterModalOpen, setRegisterModalOpen, errorBack } =
    useContext(ContainerContext);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600">🎬 MovieHub</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and explore your favorite movies & TV shows
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {errorBack && (
                <div className="text-red-500 text-sm text-center font-medium">
                  {errorBack}
                </div>
              )}

              <FormInput
                name="email"
                type="email"
                placeholder="Email address"
              />
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md transition duration-200 cursor-pointer ${
                  isSubmitting
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
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
          )}
        </Formik>
      </div>

      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setRegisterModalOpen(false)} />
      )}
    </div>
  );
};

export default Login;
