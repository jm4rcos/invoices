import { Table } from "../../components/table";
import { useConsumerData } from "../../hooks/useConsumerData";

const InvoiceLibrary = () => {
  const { data, isLoading } = useConsumerData();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="h-full w-full space-y-4 overflow-hidden">
      <h3 className="text-2xl font-semibold">Faturas</h3>
      <Table data={data} />
    </div>
  );
};

export default InvoiceLibrary;
