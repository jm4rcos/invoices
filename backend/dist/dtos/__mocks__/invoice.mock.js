"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockWhereInvoices = exports.mockInvoice = void 0;
exports.mockInvoice = {
    id: "1",
    consumerUnitId: "1",
    referenceMonth: "JAN/2023",
    electricityKwh: 100,
    electricityValue: 50,
    sceeEnergyKwh: 20,
    sceeEnergyValue: 10,
    distributor: "Test Distributor",
    compensatedEnergyGDIKwh: 10,
    compensatedEnergyGDIValue: 5,
    totalValue: 55,
    pdfUrl: "https://cloudinary.com/pdf/12345",
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-01T00:00:00Z"),
};
exports.mockWhereInvoices = [
    {
        id: "invoice-1",
        consumerUnitId: "consumer-unit-1",
        referenceMonth: "2023-01",
    },
    {
        id: "invoice-2",
        consumerUnitId: "consumer-unit-2",
        referenceMonth: "2023-02",
    },
];
