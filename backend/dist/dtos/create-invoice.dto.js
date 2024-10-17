"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceDto = void 0;
const zod_1 = require("zod");
exports.createInvoiceDto = zod_1.z.object({
    clientNumber: zod_1.z.string(),
    referenceMonth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date string",
    }),
    energyConsumption: zod_1.z.number().positive(),
    compensatedEnergy: zod_1.z.number(),
    totalValue: zod_1.z.number(),
});
