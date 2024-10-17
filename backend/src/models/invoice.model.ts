import { z } from "zod";

const invoiceSchema = z.object({
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.string(),
  energyConsumption: z.number(),
  compensatedEnergy: z.number(),
  totalValue: z.number(),
});

type Invoice = z.infer<typeof invoiceSchema>;

export { Invoice, invoiceSchema };
