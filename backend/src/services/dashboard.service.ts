import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardService {
  async getDashboardData() {
    const invoices = await prisma.invoice.findMany();

    const totalEnergyConsumption = invoices.reduce(
      (acc, invoice) =>
        acc + invoice.electricityKwh + (invoice.sceeEnergyKwh || 0),
      0
    );

    const totalCompensatedEnergy = invoices.reduce(
      (acc, invoice) => acc + (invoice.compensatedEnergyGDIKwh || 0),
      0
    );

    const totalValueWithoutGD = invoices.reduce(
      (acc, invoice) =>
        acc + invoice.electricityValue + (invoice.sceeEnergyValue || 0),
      0
    );

    const totalEconomyGD = invoices.reduce(
      (acc, invoice) => acc + (invoice.compensatedEnergyGDIValue || 0),
      0
    );

    return {
      totalEnergyConsumption,
      totalCompensatedEnergy,
      totalValueWithoutGD,
      totalEconomyGD,
      invoices,
    };
  }
}
