import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import {
  mockConsumer,
  mockCreateConsumer,
} from "../../dtos/__mock__/consumer.mock";
import { Consumer, mockWhereConsumer } from "../../dtos/consumer.dto";
import { ConsumerRepository } from "./consumer.repository";

const mockPrisma = (() => {
  const mockPrisma = mockDeep<PrismaClient>();
  jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
  }));
  return mockPrisma;
})();

describe("ConsumerRepository", () => {
  let consumerRepository: ConsumerRepository;

  beforeEach(() => {
    mockReset(mockPrisma);
    consumerRepository = new ConsumerRepository();
  });

  describe("findFirst", () => {
    it("should return the first consumer that matches the query", async () => {
      mockPrisma.consumerUnit.findFirst.mockResolvedValue(mockConsumer);

      const result = await consumerRepository.findFirst(mockWhereConsumer);

      expect(result).toEqual(mockConsumer);
      expect(mockPrisma.consumerUnit.findFirst).toHaveBeenCalledWith(
        mockWhereConsumer
      );
    });

    it("should return null if no consumer matches the query", async () => {
      mockPrisma.consumerUnit.findFirst.mockResolvedValue(null);

      const result = await consumerRepository.findFirst(mockWhereConsumer);

      expect(result).toBeNull();
      expect(mockPrisma.consumerUnit.findFirst).toHaveBeenCalledWith({
        where: mockWhereConsumer,
      });
    });
  });

  describe("findMany", () => {
    it("should return all consumers that match the query", async () => {
      mockPrisma.consumerUnit.findMany.mockResolvedValue([mockConsumer]);

      const result = await consumerRepository.findMany(mockWhereConsumer);

      expect(result).toEqual([mockConsumer]);
      expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
        where: mockWhereConsumer,
      });
    });

    it("should return an empty array if no consumers match the query", async () => {
      mockPrisma.invoice.findMany.mockResolvedValue([]);

      const result = await consumerRepository.findMany(mockWhereConsumer);

      expect(result).toEqual([]);
      expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
        where: mockWhereConsumer,
      });
    });
  });

  describe("create", () => {
    it("should create a new Consumer", async () => {
      mockPrisma.consumerUnit.create.mockResolvedValue(mockConsumer);

      const result = await consumerRepository.create(mockCreateConsumer);

      expect(result).toEqual(mockConsumer);
      expect(mockPrisma.consumerUnit.create).toHaveBeenCalledWith({
        data: mockCreateConsumer,
      });
    });
  });

  describe("update", () => {
    it("should update an existing consumer", async () => {
      const mockUpdateConsumer: Partial<Consumer> = {
        clientName: "Novo Nome de Teste",
      };

      mockPrisma.consumerUnit.update.mockResolvedValue(mockConsumer);

      const result = await consumerRepository.update(
        { id: "1" },
        mockUpdateConsumer
      );

      expect(result).toEqual(mockConsumer);
      expect(mockPrisma.invoice.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: mockUpdateConsumer,
      });
    });

    it("should return null if the consumer does not exist", async () => {
      const mockUpdateConsumer: Partial<Consumer> = {
        clientName: "Novo Nome de Teste",
      };

      (mockPrisma.consumerUnit.update as jest.Mock).mockResolvedValue(null);

      const result = await consumerRepository.update(
        { id: "1" },
        mockUpdateConsumer
      );

      expect(result).toBeNull();
      expect(mockPrisma.consumerUnit.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: mockUpdateConsumer,
      });
    });
  });
});
