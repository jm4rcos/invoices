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
exports.InvoiceService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class InvoiceService {
    createInvoice(invoiceData) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.invoice.upsert({
                where: {
                    clientNumber_referenceMonth: {
                        clientNumber: invoiceData.clientNumber,
                        referenceMonth: invoiceData.referenceMonth,
                    },
                },
                update: invoiceData,
                create: invoiceData,
            });
        });
    }
    getInvoices(clientNumber, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (clientNumber)
                where.clientNumber = clientNumber;
            if (month)
                where.referenceMonth = month;
            return prisma.invoice.findMany({ where });
        });
    }
    getDashboardData() {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield prisma.invoice.findMany();
            // Aqui você implementaria a lógica para calcular os totais e preparar os dados para o dashboard
            // Este é apenas um exemplo simplificado
            // const totalEnergyConsumption = invoices.reduce(
            //   (sum, invoice) => sum + invoice.energyConsumption,
            //   0
            // );
            // const totalCompensatedEnergy = invoices.reduce(
            //   (sum, invoice) => sum + invoice.compensatedEnergy,
            //   0
            // );
            // return {
            //   totalEnergyConsumption,
            //   totalCompensatedEnergy,
            //   // Adicione outros cálculos relevantes aqui
            // };
        });
    }
}
exports.InvoiceService = InvoiceService;
