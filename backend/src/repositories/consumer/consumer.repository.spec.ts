import { ConsumerUnit, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import {
  mockConsumer,
  mockCreateConsumer,
} from "../../dtos/__mocks__/consumer.mock";
import { ConsumerRepository } from "./consumer.repository";

const mockPrisma = mockDeep<PrismaClient>();

const mockWhereConsumer = { clientNumber: "123456" };

describe("ConsumerRepository", () => {
  let consumerRepository: ConsumerRepository;

  beforeEach(() => {
    mockReset(mockPrisma);
    consumerRepository = new ConsumerRepository(mockPrisma);
  });

  describe("findFirst", () => {
    it("should return the first consumer that matches the query", async () => {
      mockPrisma.consumerUnit.findFirst.mockResolvedValue(mockConsumer);

      const result = await consumerRepository.findFirst(mockWhereConsumer);

      expect(result).toEqual(mockConsumer);
      expect(mockPrisma.consumerUnit.findFirst).toHaveBeenCalledWith({
        where: mockWhereConsumer,
      });
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
      const mockConsumers: ConsumerUnit[] = [mockConsumer];

      mockPrisma.consumerUnit.findMany.mockResolvedValue(mockConsumers);

      const result = await consumerRepository.findMany(mockWhereConsumer);

      expect(result).toEqual(mockConsumers);
      expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
        where: mockWhereConsumer,
        include: { invoices: true },
      });
    });

    it("should return an empty array if no consumers match the query", async () => {
      mockPrisma.consumerUnit.findMany.mockResolvedValue([]);

      const result = await consumerRepository.findMany(mockWhereConsumer);

      expect(result).toEqual([]);
      expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
        where: mockWhereConsumer,
        include: { invoices: true },
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
});
