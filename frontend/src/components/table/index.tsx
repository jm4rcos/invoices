import { Invoice } from "../../schemas";

interface TableProps {
  data: Invoice[];
}
export const Table = ({ data }: TableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-text dark:text-text">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Client Number
            </th>
            <th scope="col" className="px-6 py-3">
              Reference Month
            </th>
            <th scope="col" className="px-6 py-3">
              Energy Consumption
            </th>
            <th scope="col" className="px-6 py-3">
              Compensated Energy
            </th>
            <th scope="col" className="px-6 py-3">
              Total Value
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-title whitespace-nowrap"
              >
                {item.clientNumber}
              </th>
              <td className="px-6 texte-center py-4">{item.referenceMonth}</td>
              <td className="px-6 text-center py-4">
                {item.energyConsumption}
              </td>
              <td className="px-6 text-center py-4">
                {item.compensatedEnergy.toFixed(2)}
              </td>
              <td className="px-6 text-center py-4">
                ${item.totalValue.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
