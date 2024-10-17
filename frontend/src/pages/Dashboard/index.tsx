import { useQuery } from "@tanstack/react-query";
import { Card } from "./_components/card";
import { RecycleIcon, ZapIcon, DollarSignIcon } from "lucide-react";
import { Invoice } from "../../schemas";
import { AriaChart } from "../../components/chart/aria-chart";
import { BarChart } from "../../components/chart/bar-chart";

const Dashboard = () => {
  const fetchDataDashboard = async () => {
    const response = await fetch(
      "http://localhost:3333/api/invoices/dashboard"
    );
    return response.json();
  };

  const getAllInvoices = async () => {
    const response = await fetch("http://localhost:3333/api/invoices");
    return response.json();
  };

  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDataDashboard,
  });

  if (invoicesLoading || dashboardLoading) return <div>Carregando...</div>;

  // Cálculos
  const totalEnergyConsumption = dashboardData?.totalEnergyConsumption || 0;
  const totalCompensatedEnergy = dashboardData?.totalCompensatedEnergy || 0;
  const totalValueWithoutGD =
    invoices?.reduce(
      (acc: number, invoice: { totalValue: number }) =>
        acc + invoice.totalValue,
      0
    ) || 0;
  const totalEconomyGD =
    invoices?.reduce(
      (
        acc: number,
        invoice: {
          compensatedEnergy: number;
          totalValue: number;
          energyConsumption: number;
        }
      ) =>
        acc +
        (invoice.compensatedEnergy * invoice.totalValue) /
          invoice.energyConsumption,
      0
    ) || 0;

  // Dados para os gráficos
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

  return (
    <div className="h-full w-full space-y-4 pb-4">
      <h3 className="text-2xl font-semibold">Dashboard</h3>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <Card
          icon={ZapIcon}
          title="Consumo Total"
          subtitle={`${totalEnergyConsumption.toFixed(2)} kWh`}
          color="bg-secondary"
        />
        <Card
          icon={RecycleIcon}
          title="Compensação Total"
          subtitle={`${totalCompensatedEnergy.toFixed(2)} kWh`}
          color="bg-primary"
        />
        <Card
          icon={DollarSignIcon}
          title="Valor Total sem GD"
          subtitle={`R$ ${totalValueWithoutGD.toFixed(2)}`}
          color="bg-muted"
        />
        <Card
          icon={DollarSignIcon}
          title="Economia GD"
          subtitle={`R$ ${totalEconomyGD.toFixed(2)}`}
          color="bg-fuchsia-300"
        />
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
