import { Invoice } from "@prisma/client";
import { CreateInvoice } from "../../dtos/invoice.dto";

export interface IInvoiceRepository {
  findFirst(where: {
    id?: string;
    consumerUnitId?: string;
    referenceMonth?: string;
  }): Promise<Invoice | null>;

  findMany(where?: Partial<Invoice>): Promise<Invoice[]>;

  create(data: CreateInvoice): Promise<Invoice>;
}
