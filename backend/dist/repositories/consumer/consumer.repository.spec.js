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
const consumer_mock_1 = require("../../dtos/__mocks__/consumer.mock");
const consumer_repository_1 = require("./consumer.repository");
const mockPrisma = (0, jest_mock_extended_1.mockDeep)();
const mockWhereConsumer = { clientNumber: "123456" };
describe("ConsumerRepository", () => {
    let consumerRepository;
    beforeEach(() => {
        (0, jest_mock_extended_1.mockReset)(mockPrisma);
        consumerRepository = new consumer_repository_1.ConsumerRepository(mockPrisma);
    });
    describe("findFirst", () => {
        it("should return the first consumer that matches the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.consumerUnit.findFirst.mockResolvedValue(consumer_mock_1.mockConsumer);
            const result = yield consumerRepository.findFirst(mockWhereConsumer);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockPrisma.consumerUnit.findFirst).toHaveBeenCalledWith({
                where: mockWhereConsumer,
            });
        }));
        it("should return null if no consumer matches the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.consumerUnit.findFirst.mockResolvedValue(null);
            const result = yield consumerRepository.findFirst(mockWhereConsumer);
            expect(result).toBeNull();
            expect(mockPrisma.consumerUnit.findFirst).toHaveBeenCalledWith({
                where: mockWhereConsumer,
            });
        }));
    });
    describe("findMany", () => {
        it("should return all consumers that match the query", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockConsumers = [consumer_mock_1.mockConsumer];
            mockPrisma.consumerUnit.findMany.mockResolvedValue(mockConsumers);
            const result = yield consumerRepository.findMany(mockWhereConsumer);
            expect(result).toEqual(mockConsumers);
            expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
                where: mockWhereConsumer,
                include: { invoices: true },
            });
        }));
        it("should return an empty array if no consumers match the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.consumerUnit.findMany.mockResolvedValue([]);
            const result = yield consumerRepository.findMany(mockWhereConsumer);
            expect(result).toEqual([]);
            expect(mockPrisma.consumerUnit.findMany).toHaveBeenCalledWith({
                where: mockWhereConsumer,
                include: { invoices: true },
            });
        }));
    });
    describe("create", () => {
        it("should create a new Consumer", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.consumerUnit.create.mockResolvedValue(consumer_mock_1.mockConsumer);
            const result = yield consumerRepository.create(consumer_mock_1.mockCreateConsumer);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockPrisma.consumerUnit.create).toHaveBeenCalledWith({
                data: consumer_mock_1.mockCreateConsumer,
            });
        }));
    });
});
