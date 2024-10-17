import { PrismaClient } from "@prisma/client";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";

const prisma = new PrismaClient();

export class InvoiceService {
  async createInvoice(invoiceData: CreateInvoiceDto) {
    return prisma.invoice.upsert({
      where: {
        clientNumber_referenceMonth: {
          clientNumber: invoiceData.clientNumber,
          referenceMonth: invoiceData.referenceMonth,
        },
      },
      update: invoiceData,
      create: invoiceData,
    });
  }

  async getInvoices(clientNumber?: string, month?: string) {
    const where: any = {};
    if (clientNumber) where.clientNumber = clientNumber;
    if (month) where.referenceMonth = month;

    return prisma.invoice.findMany({ where });
  }

  async getDashboardData() {
    const invoices = await prisma.invoice.findMany();

    const totalEnergyConsumption = invoices.reduce(
      (sum, invoice) => sum + invoice.energyConsumption,
      0
    );
    const totalCompensatedEnergy = invoices.reduce(
      (sum, invoice) => sum + invoice.compensatedEnergy,
      0
    );

    return {
      totalEnergyConsumption,
      totalCompensatedEnergy,
    };
  }
}
