import { useQuery } from "@tanstack/react-query";

export type DashboardData = {
  totalEnergyConsumption: number;
  totalCompensatedEnergy: number;
};
const fetchDataDashboard = async (): Promise<DashboardData> => {
  const response = await fetch(`http://localhost:3333/api/dashboard`);
  return response.json();
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDataDashboard,
  });
};
