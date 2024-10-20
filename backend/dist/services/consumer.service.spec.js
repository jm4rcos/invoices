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
const jest_mock_extended_1 = require("jest-mock-extended");
const consumer_mock_1 = require("../dtos/__mocks__/consumer.mock");
const consumer_service_1 = require("./consumer.service");
const mockConsumerRepository = (0, jest_mock_extended_1.mockDeep)();
describe("ConsumerService", () => {
    let consumerService;
    beforeEach(() => {
        (0, jest_mock_extended_1.mockReset)(mockConsumerRepository);
        consumerService = new consumer_service_1.ConsumerService(mockConsumerRepository);
    });
    describe("createConsumerUnit", () => {
        it("should create a new consumer unit", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const installationNumber = consumer_mock_1.mockConsumer.installationNumber;
            const clientName = consumer_mock_1.mockConsumer.clientName;
            mockConsumerRepository.create.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield consumerService.createConsumerUnit(clientNumber, installationNumber, clientName);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.create).toHaveBeenCalledWith({
                clientNumber,
                installationNumber,
                clientName,
            });
        }));
        it("should throw an error if creation fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const installationNumber = consumer_mock_1.mockConsumer.installationNumber;
            const clientName = consumer_mock_1.mockConsumer.clientName;
            const error = new Error("Erro ao criar consumidor");
            mockConsumerRepository.create.mockRejectedValueOnce(error);
            yield expect(consumerService.createConsumerUnit(clientNumber, installationNumber, clientName)).rejects.toThrow(error);
        }));
    });
    describe("getConsumerUnit", () => {
        it("should return an existing consumer unit", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            mockConsumerRepository.findFirst.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield consumerService.getConsumerUnit(clientNumber);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
                clientNumber,
            });
        }));
        it("should return null if consumer unit does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            mockConsumerRepository.findFirst.mockResolvedValueOnce(null);
            const result = yield consumerService.getConsumerUnit(clientNumber);
            expect(result).toBeNull();
            expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
                clientNumber,
            });
        }));
        it("should throw an error if retrieval fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            const error = new Error("Erro ao obter consumidor");
            mockConsumerRepository.findFirst.mockRejectedValueOnce(error);
            yield expect(consumerService.getConsumerUnit(clientNumber)).rejects.toThrow(error);
        }));
    });
    describe("getAllConsumerUnits", () => {
        it("should return all consumer units", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.findMany.mockResolvedValueOnce([consumer_mock_1.mockConsumer]);
            const result = yield consumerService.getAllConsumerUnits();
            expect(result).toEqual([consumer_mock_1.mockConsumer]);
            expect(mockConsumerRepository.findMany).toHaveBeenCalledWith();
        }));
        it("should return an empty array if no consumer units exist", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.findMany.mockResolvedValueOnce([]);
            const result = yield consumerService.getAllConsumerUnits();
            expect(result).toEqual([]);
            expect(mockConsumerRepository.findMany).toHaveBeenCalledWith();
        }));
        it("should throw an error if retrieval fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error("Erro ao obter todos os consumidores");
            mockConsumerRepository.findMany.mockRejectedValueOnce(error);
            yield expect(consumerService.getAllConsumerUnits()).rejects.toThrow(error);
        }));
    });
});
