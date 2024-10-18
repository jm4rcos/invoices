"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerUnitSchema = void 0;
const zod_1 = require("zod");
const ConsumerUnitSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    clientNumber: zod_1.z.string().min(1).max(255),
    clientName: zod_1.z.string().optional(),
    installationNumber: zod_1.z.string().min(1).max(255),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.ConsumerUnitSchema = ConsumerUnitSchema;
