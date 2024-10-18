import React from "react";
import { AtomIcon, MenuIcon, XIcon } from "lucide-react";
import { useSidebarStore } from "../../store/use-sidebar-store";

const Navbar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  return (
    <nav className="flex items-center justify-between px-6 p-6 bg-background border-b border-accent text-white">
      <div className="flex items-center space-x-20">
        <div className="flex items-center space-x-2">
          <AtomIcon className="text-secondary h-8 w-8" />
          <span className="font-bold text-xl">Lumi</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div
          onClick={toggleSidebar}
          className="lg:hidden flex items-center justify-center rounded-full bg-accent p-2"
        >
          {!isOpen ? (
            <MenuIcon className="w-6 h-6 text-gray-400 hover:text-title cursor-pointer transition-colors duration-300" />
          ) : (
            <XIcon className="w-6 h-6 text-gray-400 hover:text-title cursor-pointer transition-colors duration-300" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
