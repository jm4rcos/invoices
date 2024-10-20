import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import { mockInvoice } from "../dtos/__mocks__/invoice.mock";
import { DashboardService } from "./dashboard.service";

const mockPrisma = mockDeep<PrismaClient>();

describe("DashboardService", () => {
  let dashboardService: DashboardService;

  beforeEach(() => {
    mockReset(mockPrisma);
    dashboardService = new DashboardService(mockPrisma);
  });

  it("should calculate dashboard data correctly", async () => {
    mockPrisma.invoice.findMany.mockResolvedValue([mockInvoice]);

    const result = await dashboardService.getDashboardData();

    expect(result.totalEnergyConsumption).toEqual(120);
    expect(result.totalCompensatedEnergy).toEqual(10);
    expect(result.totalValueWithoutGD).toEqual(60);
    expect(result.totalEconomyGD).toEqual(5);
    expect(result.invoices).toEqual([mockInvoice]);

    expect(mockPrisma.invoice.findMany).toHaveBeenCalled();
  });
});
