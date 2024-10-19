import { PrismaClient } from "@prisma/client";
import { DashboardService } from "./dashboard.service";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    invoice: {
      findMany: jest.fn(),
    },
  })),
}));

describe("DashboardService", () => {
  let dashboardService: DashboardService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prismaClientMock = new PrismaClient() as jest.Mocked<PrismaClient>;
    dashboardService = new DashboardService();
  });

  it("should calculate dashboard data correctly", async () => {
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

    (prismaClientMock.invoice.findMany as jest.Mock).mockResolvedValue(
      mockInvoices
    );

    const result = await dashboardService.getDashboardData();

    expect(result).toEqual({
      totalEnergyConsumption: 450,
      totalCompensatedEnergy: 90,
      totalValueWithoutGD: 225,
      totalEconomyGD: 45,
      invoices: mockInvoices,
    });

    expect(prismaClientMock.invoice.findMany).toHaveBeenCalledTimes(1);
  });
});
