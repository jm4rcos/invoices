import { Invoice, PrismaClient } from "@prisma/client";
import { CreateInvoice } from "../../dtos/invoice.dto";
import { IInvoiceRepository } from "./IInvoiceRepository";

export class InvoiceRepository implements IInvoiceRepository {
  constructor(private prisma: PrismaClient) {}

  async findFirst(where: {
    id?: string;
    consumerUnitId?: string;
    referenceMonth?: string;
  }): Promise<Invoice | null> {
    return this.prisma.invoice.findFirst({ where });
  }

  async findMany(where: Partial<Invoice>): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({ where });
  }

  async create(data: CreateInvoice): Promise<Invoice> {
    return this.prisma.invoice.create({ data });
  }
}
