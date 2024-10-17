import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
}

export const Card = ({ title, color, subtitle, icon: Icon }: CardProps) => {
  return (
    <div
      className={`
        ${color}
        flex flex-col justify-between gap-4 w-full p-4 rounded-lg text-[#1f1f1f]`}
    >
      <div>
        <Icon className="h-6 w-6 mb-2" />
        <div>
          <h4 className="text-[#1f1f1f] text-md">{title}</h4>
          <p className="text-md font-semibold">{subtitle}</p>
        </div>
      </div>
      <h4 className="text-[#1f1f1f] text-md font-semibold">Go to service</h4>
    </div>
  );
};
