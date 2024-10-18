import { FileTextIcon, XIcon } from "lucide-react";
import { Consumer } from "../../schemas";
import { Tootilip } from "../tooltip";
import { useSearchParams } from "react-router-dom";
import { Input } from "../input";

interface TableProps {
  data: Consumer[];
}

export const Table = ({ data }: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clientNumberFilter = searchParams.get("clientNumber") || "";
  const yearFilter = parseInt(
    searchParams.get("year") || new Date().getFullYear().toString(),
    10
  );

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

  const filteredData = data.filter((item) => {
    const clientNumberMatch = item.clientNumber.includes(clientNumberFilter);
    const yearMatch = item.invoices.some((invoice) => {
      const invoiceYear = parseInt(invoice.referenceMonth.split("/")[1], 10);
      return invoiceYear === yearFilter;
    });
    return clientNumberMatch && yearMatch;
  });

  const handleFilterByYear = (value: string | number) => {
    const convertedValue = Number(value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      year: convertedValue.toString(),
    });
  };

  const handleFilterByClientNumber = (value: string | number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      clientNumber: value.toString(),
    });
  };

  return (
    <>
      <div className="py-4 space-x-4">
        <Input
          placeholder="Nº do cliente"
          value={clientNumberFilter}
          onChange={handleFilterByClientNumber}
        />
        <Input
          type="number"
          placeholder="Filtrar por ano"
          value={yearFilter}
          onChange={handleFilterByYear}
        />
      </div>
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
            {filteredData.map((item: Consumer) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
