"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConsumerDto = exports.ConsumerDto = void 0;
const zod_1 = require("zod");
const ConsumerDto = zod_1.z.object({
    id: zod_1.z.string(),
    clientNumber: zod_1.z.string().min(1).max(255),
    clientName: zod_1.z.string(),
    installationNumber: zod_1.z.string().min(1).max(255),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.ConsumerDto = ConsumerDto;
const CreateConsumerDto = zod_1.z.object({
    clientNumber: zod_1.z.string().min(1).max(255),
    clientName: zod_1.z.string(),
    installationNumber: zod_1.z.string().min(1).max(255),
});
exports.CreateConsumerDto = CreateConsumerDto;
