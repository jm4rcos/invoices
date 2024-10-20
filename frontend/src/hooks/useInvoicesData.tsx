import { useEffect, useState } from "react";

import { Invoice } from "../schemas";

const apiUrl = import.meta.env.VITE_API_URL;
const getAllInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch(`${apiUrl}/invoices`);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  return response.json();
};

export const useInvoicesData = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllInvoices();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
