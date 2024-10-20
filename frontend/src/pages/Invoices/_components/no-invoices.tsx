import { FileX2Icon } from "lucide-react";

export const NoInvoices = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-accent rounded-lg shadow-md">
      <FileX2Icon className="h-12 w-12 text-rose-400 mb-3" />
      <p className="text-title text-lg font-medium">
        Nenhuma fatura encontrada
      </p>
      <p className="text-text font-semibold text-sm mt-2">
        Adicione uma nova fatura ou volte mais tarde.
      </p>
    </div>
  );
};
