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
exports.ConsumerController = void 0;
class ConsumerController {
    constructor(consumerService) {
        this.consumerService = consumerService;
        this.getAllConsumerUnits = (_, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const consumerUnits = yield this.consumerService.getAllConsumerUnits();
                res.json(consumerUnits);
            }
            catch (error) {
                next(error);
            }
        });
        this.getConsumerUnit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientNumber } = req.params;
                const consumerUnit = yield this.consumerService.getConsumerUnit(clientNumber);
                res.json(consumerUnit);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ConsumerController = ConsumerController;
