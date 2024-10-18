import { Invoice, PrismaClient } from "@prisma/client";
import { CreateInvoice } from "../../dtos/invoice.dto";
import { IInvoiceRepository } from "./IInvoiceRepository";

const prisma = new PrismaClient();

export class InvoiceRepository implements IInvoiceRepository {
  async findFirst(where: {
    id?: string;
    consumerUnitId?: string;
    referenceMonth?: string;
  }): Promise<Invoice | null> {
    return prisma.invoice.findFirst({ where });
  }

  async findMany(where: Partial<Invoice>): Promise<Invoice[]> {
    return prisma.invoice.findMany({ where });
  }

  async create(data: CreateInvoice): Promise<Invoice> {
    return prisma.invoice.create({ data });
  }

  async update(
    where: {
      id: string;
    },
    data: Partial<Invoice>
  ): Promise<Invoice> {
    return prisma.invoice.update({ where, data });
  }
}
