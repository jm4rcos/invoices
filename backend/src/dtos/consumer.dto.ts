import { z } from "zod";

const ConsumerDto = z.object({
  id: z.string(),
  clientNumber: z.string().min(1).max(255),
  clientName: z.string(),
  installationNumber: z.string().min(1).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateConsumerDto = z.object({
  clientNumber: z.string().min(1).max(255),
  clientName: z.string(),
  installationNumber: z.string().min(1).max(255),
});

const mockWhereConsumer = {
  id: "1",
  consumerUnitId: "1",
  referenceMonth: "JAN/2023",
};

type CreateConsumer = z.infer<typeof CreateConsumerDto>;
type Consumer = z.infer<typeof ConsumerDto>;

export {
  Consumer,
  ConsumerDto,
  CreateConsumer,
  CreateConsumerDto,
  mockWhereConsumer,
};
