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
const client_1 = require("@prisma/client");
const dashboard_service_1 = require("../../services/dashboard.service");
jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        invoice: {
            findMany: jest.fn(),
        },
    })),
}));
describe("DashboardService", () => {
    let dashboardService;
    let prismaClientMock;
    beforeEach(() => {
        prismaClientMock = new client_1.PrismaClient();
        dashboardService = new dashboard_service_1.DashboardService();
    });
    it("should calculate dashboard data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockInvoices = [
            {
                id: "1",
                electricityKwh: 100,
                electricityValue: 50,
                sceeEnergyKwh: 50,
                sceeEnergyValue: 25,
                compensatedEnergyGDIKwh: 30,
                compensatedEnergyGDIValue: 15,
            },
            {
                id: "2",
                electricityKwh: 200,
                electricityValue: 100,
                sceeEnergyKwh: 100,
                sceeEnergyValue: 50,
                compensatedEnergyGDIKwh: 60,
                compensatedEnergyGDIValue: 30,
            },
        ];
        prismaClientMock.invoice.findMany.mockResolvedValue(mockInvoices);
        const result = yield dashboardService.getDashboardData();
        expect(result).toEqual({
            totalEnergyConsumption: 450,
            totalCompensatedEnergy: 90,
            totalValueWithoutGD: 225,
            totalEconomyGD: 45,
            invoices: mockInvoices,
        });
        expect(prismaClientMock.invoice.findMany).toHaveBeenCalledTimes(1);
    }));
});
