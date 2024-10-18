import { z } from "zod";

const ConsumerUnitSchema = z.object({
  id: z.number().int().optional(),
  clientNumber: z.string().min(1).max(255),
  installationNumber: z.string().min(1).max(255),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Consumer = z.infer<typeof ConsumerUnitSchema>;

export { Consumer, ConsumerUnitSchema };
