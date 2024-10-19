import { mockConsumer } from "../dtos/__mock__/consumer.mock";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { ConsumerService } from "./consumer.service";

jest.mock("../repositories/consumer/consumer.repository");
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    consumer: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

const mockConsumerRepository = ConsumerRepository as jest.MockedClass<
  typeof ConsumerRepository
>;

describe("ConsumerService", () => {
  let consumerService: ConsumerService;

  beforeEach(() => {
    consumerService = new ConsumerService();
    jest.clearAllMocks();
  });

  describe("createConsumerUnit", () => {
    it("should create a new consumer unit", async () => {
      const clientNumber = mockConsumer.clientNumber;
      const installationNumber = mockConsumer.installationNumber;
      const clientName = mockConsumer.clientName;

      mockConsumerRepository.prototype.create.mockResolvedValueOnce(
        mockConsumer
      );

      const result = await consumerService.createConsumerUnit(
        clientNumber,
        installationNumber,
        clientName
      );

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith({
        clientNumber,
        installationNumber,
        clientName,
      });
    });

    it("should throw an error if creation fails", async () => {
      const clientNumber = mockConsumer.clientNumber;
      const installationNumber = mockConsumer.installationNumber;
      const clientName = mockConsumer.clientName;

      const error = new Error("Erro ao criar consumidor");
      mockConsumerRepository.prototype.create.mockRejectedValueOnce(error);

      await expect(
        consumerService.createConsumerUnit(
          clientNumber,
          installationNumber,
          clientName
        )
      ).rejects.toThrow(error);
    });
  });

  describe("getConsumerUnit", () => {
    it("should return an existing consumer unit", async () => {
      const clientNumber = mockConsumer.clientNumber;

      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(
        mockConsumer
      );

      const result = await consumerService.getConsumerUnit(clientNumber);

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber,
      });
    });

    it("should return null if consumer unit does not exist", async () => {
      const clientNumber = mockConsumer.clientNumber;

      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);

      const result = await consumerService.getConsumerUnit(clientNumber);

      expect(result).toBeNull();
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber,
      });
    });

    it("should throw an error if retrieval fails", async () => {
      const clientNumber = mockConsumer.clientNumber;

      const error = new Error("Failed to get consumer unit");
      mockConsumerRepository.prototype.findFirst.mockRejectedValueOnce(error);

      await expect(
        consumerService.getConsumerUnit(clientNumber)
      ).rejects.toThrow(error);
    });
  });

  describe("getAllConsumerUnits", () => {
    it("should return all consumer units", async () => {
      mockConsumerRepository.prototype.findMany.mockResolvedValueOnce([
        mockConsumer,
      ]);

      const result = await consumerService.getAllConsumerUnits();

      expect(result).toEqual([mockConsumer]);
      expect(mockConsumerRepository.prototype.findMany).toHaveBeenCalledWith();
    });

    it("should return an empty array if no consumer units exist", async () => {
      mockConsumerRepository.prototype.findMany.mockResolvedValueOnce([]);

      const result = await consumerService.getAllConsumerUnits();

      expect(result).toEqual([]);
      expect(mockConsumerRepository.prototype.findMany).toHaveBeenCalledWith();
    });

    it("should throw an error if retrieval fails", async () => {
      const error = new Error("Failed to get all consumer units");
      mockConsumerRepository.prototype.findMany.mockRejectedValueOnce(error);

      await expect(consumerService.getAllConsumerUnits()).rejects.toThrow(
        error
      );
    });
  });
});
