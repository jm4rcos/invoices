import { Card } from "./_components/card";
import { RecycleIcon, ZapIcon, DollarSignIcon } from "lucide-react";
import { Invoice } from "../../schemas";
import { AriaChart } from "../../components/chart/aria-chart";
import { BarChart } from "../../components/chart/bar-chart";
import { useInvoicesData } from "../../hooks/useInvoicesData";
import {
  calculateTotalEconomyGD,
  calculateTotalEnergyConsumption,
  calculateTotalCompensatedEnergy,
  calculateTotalValueWithoutGD,
} from "../../utils/calculations";

const Dashboard = () => {
  const { data: invoices, isLoading: invoicesLoading } = useInvoicesData();

  if (invoicesLoading) return <div>Carregando...</div>;

  const totalEnergyConsumption = calculateTotalEnergyConsumption(invoices);
  const totalCompensatedEnergy = calculateTotalCompensatedEnergy(invoices);
  const totalValueWithoutGD = calculateTotalValueWithoutGD(invoices);
  const totalEconomyGD = calculateTotalEconomyGD(invoices);

  const energyChartData = invoices.map((invoice: Invoice) => ({
    month: invoice.referenceMonth,
    consumo: invoice.electricityKwh + (invoice.sceeEnergyKwh || 0),
    compensada: invoice.compensatedEnergyGDIKwh || 0,
  }));

  const financialChartData = invoices.map((invoice: Invoice) => ({
    month: invoice.referenceMonth,
    valorSemGD: invoice.totalValue,
    economiaGD: invoice.compensatedEnergyGDIValue || 0,
  }));

  const cardsData = [
    {
      icon: ZapIcon,
      title: "Consumo Total",
      subtitle: `${totalEnergyConsumption.toFixed(2)} kWh`,
      color: "bg-secondary",
    },
    {
      icon: RecycleIcon,
      title: "Compensação Total",
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
      subtitle: `R$ ${totalEconomyGD.toFixed(2)}`,
      color: "bg-fuchsia-200",
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
