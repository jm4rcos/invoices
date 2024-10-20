import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlusIcon } from "lucide-react";

import { Input } from "../../../components/input";
import { uploadInvoice } from "../../../services/invoice-services";
import { NewInvoiceModal } from "../../../components/modal/new-invoice-modal";

export const TableHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  const clientNumberFilter = searchParams.get("clientNumber") || "";
  const yearFilter = parseInt(
    searchParams.get("year") || new Date().getFullYear().toString(),
    10
  );

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

  const handleUpload = async (file: File) => {
    await uploadInvoice(file).then(() => {
      setOpenModal(false);
    });
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className="py-4 space-x-4">
        <Input
          placeholder="Nº do cliente"
          value={clientNumberFilter}
          onChange={(e) => handleFilterByClientNumber(e)}
        />
        <Input
          type="number"
          placeholder="Filtrar por ano"
          value={yearFilter}
          onChange={(e) => handleFilterByYear(e)}
        />
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center bg-accent hover:bg-accent-hover text-white py-2 px-4 rounded"
      >
        <PlusIcon className="w-6 h-6 mr-2" />
        Nova fatura
      </button>
      <NewInvoiceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};
