import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.number().int().optional(),
  consumerUnitId: z.number().int(),
  referenceMonth: z.string(),
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

type Invoice = z.infer<typeof InvoiceSchema>;

export { Invoice, InvoiceSchema };
