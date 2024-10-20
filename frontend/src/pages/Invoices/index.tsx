import { useConsumerData } from "../../hooks/useConsumerData";

import { Table } from "../../components/table";
import { NoInvoices } from "./_components/no-invoices";
import Loader from "../../components/loader";
import { TableHeader } from "./_components/table-header";

const Invoices = () => {
  const { data, isLoading, error } = useConsumerData();

  if (isLoading) {
    return (
      <div className="h-full w-full flex gap-4 items-center justify-center">
        <Loader />
        Carregando...
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <NoInvoices />
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar dados: {error.message}</div>;
  }

  return (
    <div className="h-full w-full space-y-4 overflow-hidden">
      <h3 className="text-2xl font-semibold">Faturas</h3>
      <TableHeader />
      <Table data={data} />
    </div>
  );
};

export default Invoices;
