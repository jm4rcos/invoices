import { useQuery } from "@tanstack/react-query";

const getAllInvoices = async () => {
  const response = await fetch(`http://localhost:3333/api/invoices`);
  return response.json();
};

export const useInvoicesData = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });
};
