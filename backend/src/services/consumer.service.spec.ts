import { mockDeep, mockReset } from "jest-mock-extended";
import { mockConsumer } from "../dtos/__mocks__/consumer.mock";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { ConsumerService } from "./consumer.service";

const mockConsumerRepository = mockDeep<ConsumerRepository>();

describe("ConsumerService", () => {
  let consumerService: ConsumerService;

  beforeEach(() => {
    mockReset(mockConsumerRepository);
    consumerService = new ConsumerService(mockConsumerRepository);
  });

  describe("createConsumerUnit", () => {
    it("should create a new consumer unit", async () => {
      const clientNumber = mockConsumer.clientNumber;
      const installationNumber = mockConsumer.installationNumber;
      const clientName = mockConsumer.clientName;

      mockConsumerRepository.create.mockResolvedValueOnce(mockConsumer);

      const result = await consumerService.createConsumerUnit(
        clientNumber,
        installationNumber,
        clientName
      );

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.create).toHaveBeenCalledWith({
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
      mockConsumerRepository.create.mockRejectedValueOnce(error);

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

      mockConsumerRepository.findFirst.mockResolvedValueOnce(mockConsumer);

      const result = await consumerService.getConsumerUnit(clientNumber);

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
        clientNumber,
      });
    });

    it("should return null if consumer unit does not exist", async () => {
      const clientNumber = mockConsumer.clientNumber;

      mockConsumerRepository.findFirst.mockResolvedValueOnce(null);

      const result = await consumerService.getConsumerUnit(clientNumber);

      expect(result).toBeNull();
      expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
        clientNumber,
      });
    });

    it("should throw an error if retrieval fails", async () => {
      const clientNumber = mockConsumer.clientNumber;
      const error = new Error("Erro ao obter consumidor");
      mockConsumerRepository.findFirst.mockRejectedValueOnce(error);

      await expect(
        consumerService.getConsumerUnit(clientNumber)
      ).rejects.toThrow(error);
    });
  });

  describe("getAllConsumerUnits", () => {
    it("should return all consumer units", async () => {
      mockConsumerRepository.findMany.mockResolvedValueOnce([mockConsumer]);

      const result = await consumerService.getAllConsumerUnits();

      expect(result).toEqual([mockConsumer]);
      expect(mockConsumerRepository.findMany).toHaveBeenCalledWith();
    });

    it("should return an empty array if no consumer units exist", async () => {
      mockConsumerRepository.findMany.mockResolvedValueOnce([]);

      const result = await consumerService.getAllConsumerUnits();

      expect(result).toEqual([]);
      expect(mockConsumerRepository.findMany).toHaveBeenCalledWith();
    });

    it("should throw an error if retrieval fails", async () => {
      const error = new Error("Erro ao obter todos os consumidores");
      mockConsumerRepository.findMany.mockRejectedValueOnce(error);

      await expect(consumerService.getAllConsumerUnits()).rejects.toThrow(
        error
      );
    });
  });
});
