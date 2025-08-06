import {
  Route,
  Routes
} from "react-router-dom";
import ContainerContextProvider from "../context/MoviesContext";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import Notfound from "../Notfound/Notfound";
import ProtectPage from "../ProtectPage/ProtectPage";
import Login from "../users/login/Login";
import Register from "../users/register/Register";

export default function App() {
  return (
    <ContainerContextProvider>
      <MasterLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPage>
                <Home />
              </ProtectPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register onClose={() => {}} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </MasterLayout>
    </ContainerContextProvider>
  );
}
