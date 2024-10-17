import React, { useState } from "react";
import { FileTextIcon, LayoutDashboardIcon, LucideIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

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
  const [activeItem, setActiveItem] = useState("/");

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <nav className="w-60 p-4">
      <ul className="font-normal space-y-2 text-text pt-4">
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
