import { z } from "zod";

const invoiceSchema = z.object({
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.date(),
  energyConsumption: z.number(),
  energySceeeWithoutIcms: z.number(),
  compensatedEnergy: z.number(),
  publicLightingContribution: z.number(),
  totalValueWithoutGd: z.number(),
  gdSavings: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type Invoice = z.infer<typeof invoiceSchema>;

export { Invoice, invoiceSchema };
