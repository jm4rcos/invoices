import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  [key: string]: number | string;
}

interface BarChartProps {
  chartData: ChartData[];
  dataKeys: string[];
}

const colors = ["#8884d8", "#82ca9d"];

export function BarChart({ chartData, dataKeys }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={colors[index]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
