import { Consumer, CreateConsumer } from "../consumer.dto";

export const mockConsumer: Consumer = {
  id: "1",
  clientNumber: "123456",
  clientName: "John Doe",
  installationNumber: "789012",
  createdAt: new Date("2023-01-01T00:00:00Z"),
  updatedAt: new Date("2023-01-01T00:00:00Z"),
};

export const mockCreateConsumer: CreateConsumer = {
  clientNumber: "123456",
  clientName: "John Doe",
  installationNumber: "789012",
};
