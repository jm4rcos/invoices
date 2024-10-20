import { useState, useEffect } from "react";
import { Consumer } from "../schemas";

const apiUrl = import.meta.env.VITE_API_URL;

const getAllConsumers = async () => {
  const response = await fetch(`${apiUrl}/consumers`);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  return response.json();
};

export const useConsumerData = () => {
  const [data, setData] = useState<Consumer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllConsumers();
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
