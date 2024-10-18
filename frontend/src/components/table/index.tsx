import { FileTextIcon } from "lucide-react";
import { Consumer } from "../../schemas";
import { Tootilip } from "../tooltip";

interface TableProps {
  data: Consumer[];
}
export const Table = ({ data }: TableProps) => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-text dark:text-text">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-title whitespace-nowrap">
              Nome da UC
            </th>
            <th className="text-nowrap px-6 py-3">Número da UC</th>
            <th className="px-6 py-3">Distribuidora</th>
            <th className="px-6 py-3">Consumidor</th>
            {months.map((month) => (
              <th key={month} className="px-6 py-3">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 max-w-[220px] truncate">
                {item.clientName}
              </td>
              <td className="px-6 py-4">{item.clientNumber}</td>
              <td className="px-6 py-4">CEMIG</td>
              <td className="px-6 py-4 max-w-[220px] truncate">
                {item.clientName}
              </td>
              {months.map((month) => (
                <td key={`${item.id}-${month}`} className="px-6 py-4">
                  <div className="relative group">
                    <FileTextIcon className="w-6 h-6 hover:text-secondary cursor-pointer" />
                    <Tootilip title="Download" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
