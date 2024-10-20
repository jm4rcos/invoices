import { z } from "zod";
import { InvoiceDto } from "./invoice.dto";

const DashboardDto = z.object({
  totalEnergyConsumption: z.number(),
  totalCompensatedEnergy: z.number(),
  totalValueWithoutGD: z.number(),
  totalEconomyGD: z.number(),
  invoices: z.array(InvoiceDto),
});

type Dashboard = z.infer<typeof DashboardDto>;

export { Dashboard, DashboardDto };
