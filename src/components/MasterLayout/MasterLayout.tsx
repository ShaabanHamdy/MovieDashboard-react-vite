import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const MasterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MasterLayout;
