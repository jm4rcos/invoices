import { useState, useEffect } from "react";

export type DashboardData = {
  totalEnergyConsumption: number;
  totalCompensatedEnergy: number;
};

const apiUrl = import.meta.env.VITE_API_URL;

const fetchDataDashboard = async (): Promise<DashboardData> => {
  const response = await fetch(`${apiUrl}/dashboard`);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  return response.json();
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataDashboard();
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
