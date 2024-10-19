"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const consumer_mock_1 = require("../dtos/__mocks__/consumer.mock");
const consumer_repository_1 = require("../repositories/cosumer/consumer.repository");
const consumer_service_1 = require("./consumer.service");
jest.mock("../repositories/consumer/consumer.repository");
const mockConsumerRepository = consumer_repository_1.ConsumerRepository;
describe("ConsumerService", () => {
    let consumerService;
    beforeEach(() => {
        consumerService = new consumer_service_1.ConsumerService();
        jest.clearAllMocks();
    });
    describe("createConsumerUnit", () => {
        it("should create a new consumer unit", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const installationNumber = consumer_mock_1.mockConsumer.installationNumber;
            const clientName = consumer_mock_1.mockConsumer.clientName;
            mockConsumerRepository.prototype.create.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield consumerService.createConsumerUnit(clientNumber, installationNumber, clientName);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith({
                clientNumber,
                installationNumber,
                clientName,
            });
        }));
        it("should throw an error if creation fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const installationNumber = consumer_mock_1.mockConsumer.installationNumber;
            const clientName = consumer_mock_1.mockConsumer.clientName;
            const error = new Error("Failed to create consumer unit");
            mockConsumerRepository.prototype.create.mockRejectedValueOnce(error);
            yield expect(consumerService.createConsumerUnit(clientNumber, installationNumber, clientName)).rejects.toThrow(error);
        }));
    });
    describe("getConsumerUnit", () => {
        it("should return an existing consumer unit", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield consumerService.getConsumerUnit(clientNumber);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber,
            });
        }));
        it("should return null if consumer unit does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);
            const result = yield consumerService.getConsumerUnit(clientNumber);
            expect(result).toBeNull();
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber,
            });
        }));
        it("should throw an error if retrieval fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const error = new Error("Failed to get consumer unit");
            mockConsumerRepository.prototype.findFirst.mockRejectedValueOnce(error);
            yield expect(consumerService.getConsumerUnit(clientNumber)).rejects.toThrow(error);
        }));
    });
    describe("getAllConsumerUnits", () => {
        it("should return all consumer units", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findMany.mockResolvedValueOnce([
                consumer_mock_1.mockConsumer,
            ]);
            const result = yield consumerService.getAllConsumerUnits();
            expect(result).toEqual([consumer_mock_1.mockConsumer]);
            expect(mockConsumerRepository.prototype.findMany).toHaveBeenCalledWith();
        }));
        it("should return an empty array if no consumer units exist", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findMany.mockResolvedValueOnce([]);
            const result = yield consumerService.getAllConsumerUnits();
            expect(result).toEqual([]);
            expect(mockConsumerRepository.prototype.findMany).toHaveBeenCalledWith();
        }));
        it("should throw an error if retrieval fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error("Failed to get all consumer units");
            mockConsumerRepository.prototype.findMany.mockRejectedValueOnce(error);
            yield expect(consumerService.getAllConsumerUnits()).rejects.toThrow(error);
        }));
    });
});
