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
class ConsumerService {
    constructor(consumerRepository) {
        this.consumerRepository = consumerRepository;
    }
    createConsumerUnit(clientNumber, installationNumber, clientName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.consumerRepository.create({
                    clientNumber,
                    installationNumber,
                    clientName,
                });
            }
            catch (error) {
                console.error("Erro ao criar o consumidor:", error);
                throw error;
            }
        });
    }
    getConsumerUnit(clientNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.consumerRepository.findFirst({
                    clientNumber,
                });
            }
            catch (error) {
                console.error("Erro ao obter o consumidor:", error);
                throw error;
            }
        });
    }
    getAllConsumerUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.consumerRepository.findMany();
            }
            catch (error) {
                console.error("Erro ao obter todos os consumidores:", error);
                throw error;
            }
        });
    }
}
exports.ConsumerService = ConsumerService;
