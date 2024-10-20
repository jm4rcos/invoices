import { FileTextIcon, XIcon } from "lucide-react";

import { Tootilip } from "../tooltip";
import { Consumer } from "../../schemas";
import { useSearchParams } from "react-router-dom";
import { months } from "../../utils/months";

interface TableProps {
  data: Consumer[];
}

export const Table = ({ data }: TableProps) => {
  const [searchParams] = useSearchParams();

  const clientNumberFilter = searchParams.get("clientNumber") || "";
  const yearFilter = parseInt(
    searchParams.get("year") || new Date().getFullYear().toString(),
    10
  );

  const filteredData = data.filter((item) => {
    const clientNumberMatch = item.clientNumber.includes(clientNumberFilter);
    const yearMatch = item.invoices.some((invoice) => {
      const invoiceYear = parseInt(invoice.referenceMonth.split("/")[1], 10);
      return invoiceYear === yearFilter;
    });
    return clientNumberMatch && yearMatch;
  });

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-title">
          <thead className="text-xs text-text uppercase bg-accent dark:bg-accent dark:text-gray-400">
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
            {filteredData.map((item: Consumer) => (
              <tr
                key={item.id}
                className="bg-accent text-title  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 max-w-[300px] truncate">
                  {item.clientName}
                </td>
                <td className="px-6 text-center py-4">{item.clientNumber}</td>
                <td className="px-6 text-center py-4">CEMIG</td>
                <td className="px-6 py-4 max-w-[300px] truncate">
                  {item.clientName}
                </td>
                {months.map((month, index) => {
                  const invoice = item.invoices && item.invoices[index];

                  if (!item.invoices[index]) {
                    return (
                      <td className="px-6 py-4" key={`${item.id}-${month}`}>
                        <div className="group relative">
                          <XIcon className="w-6 h-6 text-rose-400 cursor-pointer" />
                          <Tootilip title="Em falta" />
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={`${item.id}-${month}`} className="px-6 py-4">
                      {invoice ? (
                        <a
                          className="relative group"
                          href={invoice.pdfUrl}
                          target="_blank"
                        >
                          <FileTextIcon className="w-6 h-6 hover:text-secondary cursor-pointer" />
                          <Tootilip title="Download" />
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
