/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import {
  createHashRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import Notfound from "../Notfound/Notfound";
import ProtectPage from "../ProtectPage/ProtectPage";
import Login from "../users/login/Login";
import Register from "../users/register/Register";
import { ContainerContext } from "../context/MoviesContext";

interface DecodedToken {
  id: string;
  email: string;
  name?: string;
  exp?: number;
  [key: string]: any;
}

export default function App() {
  const [userdata, setUserdata] = useState<DecodedToken | null>(null);
 const {
setMovies,
  } = useContext(ContainerContext);
  const saveUserData = () => {
    try {
      const encoded = localStorage.getItem("token");
      if (encoded) {
        const decodedToken = jwtDecode<DecodedToken>(encoded);

        //  Check token expiry
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        setUserdata(decodedToken);
      }
    } catch (err) {
      console.error("Invalid or expired token:", err);
      localStorage.removeItem("token");
      setUserdata(null);
    }
  };

  useEffect(() => {
    saveUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserdata(null);
    setMovies([]); // Clear movies on logout
    // Redirection handled inside <ProtectPage /> or navigation hooks
  };

  const routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout logout={logout} userdata={userdata} />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <ProtectPage userdata={userdata}>
              <Home />
            </ProtectPage>
          ),
        },

        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "register",
          element: <Register onClose={() => {}} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
