import { z } from "zod";

export const invoiceSchema = z.object({
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.string(),
  energyConsumption: z.number(),
  compensatedEnergy: z.number(),
  totalValue: z.number(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
