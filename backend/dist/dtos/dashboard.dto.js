"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardDto = void 0;
const zod_1 = require("zod");
const invoice_dto_1 = require("./invoice.dto");
const DashboardDto = zod_1.z.object({
    totalEnergyConsumption: zod_1.z.number(),
    totalCompensatedEnergy: zod_1.z.number(),
    totalValueWithoutGD: zod_1.z.number(),
    totalEconomyGD: zod_1.z.number(),
    invoices: zod_1.z.array(invoice_dto_1.InvoiceDto),
});
exports.DashboardDto = DashboardDto;
