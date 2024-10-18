import { z } from "zod";

const ConsumerDto = z.object({
  id: z.string().optional(),
  clientNumber: z.string().min(1).max(255),
  clientName: z.string(),
  installationNumber: z.string().min(1).max(255),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const CreateConsumerDto = z.object({
  clientNumber: z.string().min(1).max(255),
  clientName: z.string(),
  installationNumber: z.string().min(1).max(255),
});

type CreateConsumer = z.infer<typeof CreateConsumerDto>;
type Consumer = z.infer<typeof ConsumerDto>;

export { Consumer, ConsumerDto, CreateConsumer, CreateConsumerDto };
