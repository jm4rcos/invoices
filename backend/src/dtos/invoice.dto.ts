import { z } from "zod";

const InvoiceDto = z.object({
  id: z.string().optional(),
  consumerUnitId: z.string(),
  referenceMonth: z.string(),
  distributor: z.string(),
  electricityKwh: z.number().min(0),
  electricityValue: z.number().min(0),
  sceeEnergyKwh: z.number().min(0),
  sceeEnergyValue: z.number().min(0),
  compensatedEnergyGDIKwh: z.number().min(0),
  compensatedEnergyGDIValue: z.number().min(0),
  totalValue: z.number().min(0),
  pdfUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const CreateInvoiceDto = z.object({
  consumerUnitId: z.string(),
  referenceMonth: z.string(),
  distributor: z.string(),
  electricityKwh: z.number().min(0),
  electricityValue: z.number().min(0),
  sceeEnergyKwh: z.number().min(0),
  sceeEnergyValue: z.number().min(0),
  compensatedEnergyGDIKwh: z.number().min(0),
  compensatedEnergyGDIValue: z.number().min(0),
  totalValue: z.number().min(0),
  pdfUrl: z.string(),
});

type CreateInvoice = z.infer<typeof CreateInvoiceDto>;
type Invoice = z.infer<typeof InvoiceDto>;

export { CreateInvoice, CreateInvoiceDto, Invoice, InvoiceDto };
