import { Invoice } from "../schemas";

export const calculateTotalEnergyConsumption = (
  dashboardData:
    | {
        totalEnergyConsumption: number;
      }
    | undefined
) => {
  return dashboardData?.totalEnergyConsumption || 0;
};

export const calculateTotalEconomyGD = (invoices: Invoice[]) => {
  return (
    invoices?.reduce(
      (
        acc: number,
        invoice: {
          compensatedEnergy: number;
          totalValue: number;
          energyConsumption: number;
        }
      ) =>
        acc +
        (invoice.compensatedEnergy * invoice.totalValue) /
          invoice.energyConsumption,
      0
    ) || 0
  );
};
