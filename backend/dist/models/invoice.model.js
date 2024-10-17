"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceSchema = void 0;
const zod_1 = require("zod");
const invoiceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    clientNumber: zod_1.z.string(),
    referenceMonth: zod_1.z.date(),
    energyConsumption: zod_1.z.number(),
    energySceeeWithoutIcms: zod_1.z.number(),
    compensatedEnergy: zod_1.z.number(),
    publicLightingContribution: zod_1.z.number(),
    totalValueWithoutGd: zod_1.z.number(),
    gdSavings: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.invoiceSchema = invoiceSchema;
