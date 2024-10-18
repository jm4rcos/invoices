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
exports.ConsumerService = void 0;
const consumer_repository_1 = require("../repositories/cosumer/consumer.repository");
const consumerRepository = new consumer_repository_1.ConsumerRepository();
class ConsumerService {
    createConsumerUnit(clientNumber, installationNumber, clientName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return consumerRepository.create({
                    clientNumber,
                    installationNumber,
                    clientName,
                });
            }
            catch (error) {
                console.error("Error creating consumer unit:", error);
                throw error;
            }
        });
    }
    getConsumerUnit(clientNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return consumerRepository.findFirst({
                    clientNumber,
                });
            }
            catch (error) {
                console.error("Error getting consumer unit:", error);
                throw error;
            }
        });
    }
    getAllConsumerUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return consumerRepository.findMany();
            }
            catch (error) {
                console.error("Error getting all consumer units:", error);
                throw error;
            }
        });
    }
}
exports.ConsumerService = ConsumerService;
