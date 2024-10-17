import React from "react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  text,
  href,
  isActive,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(href);
  };

  return (
    <li
      className={`${
        isActive ? "bg-accent text-title" : "bg-background text-text"
      } flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer`}
      onClick={handleClick}
    >
      <Icon className="text-xl" />
      <span>{text}</span>
    </li>
  );
};
