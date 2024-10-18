import { Card } from "./_components/card";
import { RecycleIcon, ZapIcon, DollarSignIcon } from "lucide-react";
import { Invoice } from "../../schemas";
import { AriaChart } from "../../components/chart/aria-chart";
import { BarChart } from "../../components/chart/bar-chart";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useInvoicesData } from "../../hooks/useInvoicesData";
import {
  calculateTotalEconomyGD,
  calculateTotalEnergyConsumption,
} from "../../utils/calculations";

const Dashboard = () => {
  const { data: dashboardData, isLoading: dashboardLoading } =
    useDashboardData();
  const { data: invoices, isLoading: invoicesLoading } = useInvoicesData();

  if (invoicesLoading || dashboardLoading) return <div>Carregando...</div>;

  const totalCompensatedEnergy = dashboardData?.totalCompensatedEnergy || 0;
  const totalValueWithoutGD =
    invoices?.reduce(
      (acc: number, invoice: { totalValue: number }) =>
        acc + invoice.totalValue,
      0
    ) || 0;

  const energyChartData = invoices?.map((invoice: Invoice) => ({
    month: invoice.referenceMonth,
    consumo: invoice.energyConsumption,
    compensada: invoice.compensatedEnergy,
  }));

  const financialChartData = invoices?.map((invoice: Invoice) => ({
    month: invoice.referenceMonth,
    valorSemGD: invoice.totalValue,
    economiaGD:
      (invoice.compensatedEnergy * invoice.totalValue) /
      invoice.energyConsumption,
  }));

  const cardsData = [
    {
      icon: ZapIcon,
      title: "Consumo Total",
      subtitle: `${calculateTotalEnergyConsumption(dashboardData).toFixed(
        2
      )} kWh`,
      color: "bg-secondary",
    },
    {
      icon: RecycleIcon,
      title: "Compensação Total",
      subtitle: `${totalCompensatedEnergy.toFixed(2)} kWh`,
      color: "bg-primary",
    },
    {
      icon: DollarSignIcon,
      title: "Valor Total sem GD",
      subtitle: `R$ ${totalValueWithoutGD.toFixed(2)}`,
      color: "bg-muted",
    },
    {
      icon: DollarSignIcon,
      title: "Economia GD",
      subtitle: `R$ ${calculateTotalEconomyGD(invoices).toFixed(2)}`,
      color: "bg-fuchsia-200  ",
    },
  ];

  return (
    <div className="h-full w-full space-y-4 pb-4">
      <h3 className="text-2xl font-semibold">Dashboard</h3>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <div className="w-full items-center flex gap-2 flex-col pt-8 p-2 overflow-auto">
        <h2 className="text-xl font-semibold">Resultados de Energia (kWh)</h2>
        <AriaChart
          chartData={energyChartData}
          dataKeys={["consumo", "compensada"]}
        />
      </div>
      <div className="w-full items-center flex gap-2 flex-col pt-8 p-2 overflow-auto">
        <h2 className="text-xl font-semibold">Resultados Financeiros (R$)</h2>
        <BarChart
          chartData={financialChartData}
          dataKeys={["valorSemGD", "economiaGD"]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
