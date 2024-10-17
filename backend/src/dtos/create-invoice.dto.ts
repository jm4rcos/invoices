import { z } from "zod";

export const createInvoiceDto = z.object({
  clientNumber: z.string(),
  referenceMonth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date string",
  }),
  energyConsumption: z.number().positive(),
  compensatedEnergy: z.number(),
  totalValue: z.number(),
});

export type CreateInvoiceDto = z.infer<typeof createInvoiceDto>;
