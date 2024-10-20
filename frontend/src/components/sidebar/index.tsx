import React, { useState } from "react";
import { FileTextIcon, LayoutDashboardIcon, LucideIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useLocation } from "react-router-dom";

interface SidebarItemData {
  icon: LucideIcon;
  text: string;
  href: string;
}

const sidebarItemsData: SidebarItemData[] = [
  {
    icon: LayoutDashboardIcon,
    text: "Dashboard",
    href: "/",
  },
  {
    icon: FileTextIcon,
    text: "Faturas",
    href: "/invoices",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <nav className="lg:w-60 p-4 w-full">
      <ul className="font-normal flex-col space-y-2 text-text pt-4">
        {sidebarItemsData.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={activeItem === item.href}
            onClick={() => handleItemClick(item.href)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
