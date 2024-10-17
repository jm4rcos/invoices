import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex w-full h-full">
        <div className="hidden lg:flex h-full">
          <Sidebar />
        </div>

        <div className="w-full pt-8 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
