import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

interface Props {
  children: ReactNode;
}
const MasterLayout = ({ children }: Props) => {
  
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
        {children}
      </div>
    </>
  );
};

export default MasterLayout;
