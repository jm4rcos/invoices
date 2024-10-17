import React from "react";
import { AtomIcon, Bell, Search } from "lucide-react";

interface NavItem {
  label: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { label: "Cliente", isActive: false },
  { label: "Configurações", isActive: true },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 p-6 bg-background border-b border-accent text-white">
      <div className="flex items-center space-x-20">
        <div className="flex items-center space-x-2">
          <AtomIcon className="text-secondary h-8 w-8" />
          <span className="font-bold text-xl">Lumi</span>
        </div>
        <ul className="flex space-x-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`${
                  item.isActive ? "text-title" : "text-text"
                } hover:text-secondary transition-colors`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <span>João Marcos</span>
        <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
