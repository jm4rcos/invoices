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
exports.DashboardService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DashboardService {
    getDashboardData() {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield prisma.invoice.findMany();
            const totalEnergyConsumption = invoices.reduce((acc, invoice) => acc + invoice.electricityKwh + (invoice.sceeEnergyKwh || 0), 0);
            const totalCompensatedEnergy = invoices.reduce((acc, invoice) => acc + (invoice.compensatedEnergyGDIKwh || 0), 0);
            const totalValueWithoutGD = invoices.reduce((acc, invoice) => acc + invoice.electricityValue + (invoice.sceeEnergyValue || 0), 0);
            const totalEconomyGD = invoices.reduce((acc, invoice) => acc + (invoice.compensatedEnergyGDIValue || 0), 0);
            return {
                totalEnergyConsumption,
                totalCompensatedEnergy,
                totalValueWithoutGD,
                totalEconomyGD,
                invoices,
            };
        });
    }
}
exports.DashboardService = DashboardService;
