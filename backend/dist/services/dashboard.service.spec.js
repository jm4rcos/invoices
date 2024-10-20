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
const jest_mock_extended_1 = require("jest-mock-extended");
const invoice_mock_1 = require("../dtos/__mocks__/invoice.mock");
const dashboard_service_1 = require("./dashboard.service");
const mockPrisma = (0, jest_mock_extended_1.mockDeep)();
describe("DashboardService", () => {
    let dashboardService;
    beforeEach(() => {
        (0, jest_mock_extended_1.mockReset)(mockPrisma);
        dashboardService = new dashboard_service_1.DashboardService(mockPrisma);
    });
    it("should calculate dashboard data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        mockPrisma.invoice.findMany.mockResolvedValue([invoice_mock_1.mockInvoice]);
        const result = yield dashboardService.getDashboardData();
        expect(result.totalEnergyConsumption).toEqual(120);
        expect(result.totalCompensatedEnergy).toEqual(10);
        expect(result.totalValueWithoutGD).toEqual(60);
        expect(result.totalEconomyGD).toEqual(5);
        expect(result.invoices).toEqual([invoice_mock_1.mockInvoice]);
        expect(mockPrisma.invoice.findMany).toHaveBeenCalled();
    }));
});
