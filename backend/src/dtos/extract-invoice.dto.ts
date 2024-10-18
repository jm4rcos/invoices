import { z } from "zod";

const InvoiceItemDto = z.object({
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

const ExtractInvoiceDto = z.object({
  clientNumber: z.string(),
  clientName: z.string(),
  installationNumber: z.string(),
  invoice: InvoiceItemDto,
});

type ExtractInvoice = z.infer<typeof ExtractInvoiceDto>;

export { ExtractInvoice, ExtractInvoiceDto };
