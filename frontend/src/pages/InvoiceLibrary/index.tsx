import { Table } from "../../components/table";

const mockedData = [
  {
    id: "5787f773-b995-43c9-8af5-3c8d26f51389",
    clientNumber: "7204076116",
    referenceMonth: "AGO/2024",
    energyConsumption: 467,
    compensatedEnergy: 0.54226323,
    totalValue: 495.82,
    createdAt: "2024-10-17T21:06:32.653Z",
    updatedAt: "2024-10-17T21:09:27.662Z",
  },
  {
    id: "37ca0c8e-9775-48c6-994f-11f36ac95635",
    clientNumber: "7204076116",
    referenceMonth: "SET/2024",
    energyConsumption: 477,
    compensatedEnergy: 0.54798613,
    totalValue: 351.87,
    createdAt: "2024-10-17T21:09:54.482Z",
    updatedAt: "2024-10-17T21:09:54.482Z",
  },
  {
    id: "b39984e4-cabd-44e7-a53f-52f01e205e24",
    clientNumber: "7204076116",
    referenceMonth: "JAN/2024",
    energyConsumption: 506,
    compensatedEnergy: 0.48733,
    totalValue: 329.6,
    createdAt: "2024-10-17T21:10:04.966Z",
    updatedAt: "2024-10-17T21:10:04.966Z",
  },
  {
    id: "0ca23b40-5b75-4a67-9883-2a627aade4c9",
    clientNumber: "7202210726",
    referenceMonth: "JUN/2024",
    energyConsumption: 101,
    compensatedEnergy: 0,
    totalValue: 143.81,
    createdAt: "2024-10-17T21:22:57.729Z",
    updatedAt: "2024-10-17T21:22:57.729Z",
  },
];

const InvoiceLibrary = () => {
  return (
    <div className="h-full w-full space-y-4 overflow-hidden">
      <h3 className="text-2xl font-semibold">Faturas</h3>
      <Table data={mockedData} />
    </div>
  );
};

export default InvoiceLibrary;
