/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

interface Props {
  userdata: any; 
  logout: () => void;
}

const MasterLayout = ({ userdata, logout }: Props) => {
  return (
    <>
      <Navbar userdata={userdata} logout={logout} />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MasterLayout;
