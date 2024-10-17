import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex w-full h-full gap-2">
        <Sidebar />

        <div className="flex-1 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
