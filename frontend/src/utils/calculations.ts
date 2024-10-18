import { Invoice } from "../schemas";

export const calculateTotalEnergyConsumption = (
  invoices: Invoice[]
): number => {
  return invoices.reduce((total, invoice) => {
    return total + invoice.electricityKwh + (invoice.sceeEnergyKwh || 0);
  }, 0);
};

export const calculateTotalCompensatedEnergy = (
  invoices: Invoice[]
): number => {
  return invoices.reduce((total, invoice) => {
    return total + (invoice.compensatedEnergyGDIKwh || 0);
  }, 0);
};

export const calculateTotalValueWithoutGD = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => {
    return total + invoice.totalValue;
  }, 0);
};

export const calculateTotalEconomyGD = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => {
    return total + (invoice.compensatedEnergyGDIValue || 0);
  }, 0);
};
