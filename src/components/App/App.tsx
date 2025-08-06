import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import Notfound from "../Notfound/Notfound";
import ProtectPage from "../ProtectPage/ProtectPage";
import Login from "../users/login/Login";
import Register from "../users/register/Register";

export default function App() {



  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout   />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <ProtectPage>
              <Home />
            </ProtectPage>
          ),
        },

        {
          path: "login",
          element: <Login />,
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
