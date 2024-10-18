import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useSidebarStore } from "../store/use-sidebar-store";
import MobileSidebar from "./mobile-sidebar";

const Layout = () => {
  const { isOpen } = useSidebarStore();
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex relative w-full h-full">
        <div className="hidden lg:flex h-full">
          <Sidebar />
        </div>
        {isOpen && <MobileSidebar />}
        <div className={isOpen ? "hidden lg:block" : "w-full pt-8 px-4"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
